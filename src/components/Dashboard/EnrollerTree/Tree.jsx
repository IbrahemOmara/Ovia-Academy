import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./tree.css";
import { baseURL } from "../../../utils/baseURL";
import DEFAULT_AVATAR from '../../../assets/profile.png';

const API_URL = `${baseURL}/CustomerInfo/EnrollerTree111111`;

const NetworkTree = () => {
  const [data, setData] = useState({});
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isChildView, setIsChildView] = useState(false);
  const [resetFlag, setResetFlag] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const abortControllerRef = useRef(null);
  const rootIdRef = useRef(null);
  const navigate = useNavigate();

  const checkNetworkConnection = () => {
    if (!navigator.onLine) {
      setError("No internet connection");
      return false;
    }
    return true;
  };

  const getRootId = () => {
    const authData = localStorage.getItem("dataAuth");
    if (authData) {
      const auth = JSON.parse(authData);
      console.log("Fetching:", auth);
      return auth.referId || auth.customerAttributeId || null;
    }
    return null;
  };

  const fetchNetworkData = async (sponsorId, retryCount = 0) => {
    if (!sponsorId || !checkNetworkConnection()) return;
    console.log("Fetching children for sponsorId:", sponsorId);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort("New request started");
    }

    setLoading(true);
    setError(null);

    try {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort("Request timeout");
        }
      }, 10000);

      const dataUser = JSON.parse(localStorage.dataAuth);

      const response = await fetch(`${API_URL}?sponsorId=${sponsorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          setData(prev => ({
            ...prev,
            [sponsorId]: {
              ...(prev[sponsorId] || { id: sponsorId, name: "Unknown" }),
              children: [],
              hasChildren: false,
              details: "(No children)",
            },
          }));
          return;
        } else {
          setError(`Error ${response.status}: ${response.statusText}`);
          return;
        }
      }

      const text = await response.text();
      const rawResult = text ? JSON.parse(text) : {};
      const result = Array.isArray(rawResult.value) ? rawResult.value : [];
      console.log("API result:", result);

      const newData = {};

      // إنشاء الروت أو Node الحالية
      if (!data[sponsorId]) {
        newData[sponsorId] = {
          id: sponsorId,
          name: dataUser.name,
          email: dataUser.email,
          mobile: dataUser.mobile,
          children: result.map(item => item.backOfficeId),
          hasChildren: result.length > 0,
          details: `(Children: ${result.length})`,
        };
      } else {
        newData[sponsorId] = {
          ...data[sponsorId],
          children: result.map(item => item.backOfficeId),
          hasChildren: result.length > 0,
        };
      }

      // إنشاء الأبناء
      result.forEach(item => {
        newData[item.backOfficeId] = {
          id: item.backOfficeId,
          name: item.name,
          email: item.email,
          children: [],
          hasChildren: true, // نفترض عندهم أبناء (lazy load عند الضغط)
        };
      });

      setData(prev => ({ ...prev, ...newData }));
      setExpandedNodes(prev => new Set(prev).add(sponsorId));
      if (sponsorId !== rootIdRef.current) setIsChildView(true);

    } catch (error) {
      if (error.name !== "AbortError") {
        if (retryCount < 2) {
          setTimeout(() => fetchNetworkData(sponsorId, retryCount + 1), 2000);
        } else {
          setError("Network error - please check your connection and try again");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const rootId = getRootId();
    if (rootId) {
      rootIdRef.current = rootId;
      fetchNetworkData(rootId);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("Component unmounted");
      }
    };
  }, []);

  useEffect(() => {
    if (resetFlag) {
      const rootId = rootIdRef.current;
      if (rootId) {
        fetchNetworkData(rootId);
        setResetFlag(false);
      }
    }
  }, [resetFlag]);

  const handleNodeClick = (node) => {
    if (expandedNodes.has(node.id)) {
      const newSet = new Set(expandedNodes);
      newSet.delete(node.id);
      setExpandedNodes(newSet);
    } else {
      setSelectedNode(node);
    }
  };

  const closePopup = () => setSelectedNode(null);

  const toggleNode = async (nodeId) => {
    const node = data[nodeId];
    if (!node) return;

    if (!expandedNodes.has(nodeId)) {
      // لو الأبناء فاضيين وعندها احتمالية أبناء، اعمل fetch
      if (node.children.length === 0 && node.hasChildren !== false) {
        await fetchNetworkData(nodeId);
      }
      setExpandedNodes(prev => new Set(prev).add(nodeId));
      setIsChildView(true);
    } else {
      const newSet = new Set(expandedNodes);
      newSet.delete(nodeId);
      setExpandedNodes(newSet);
    }
  };

  const renderTree = (nodeId) => {
    const node = data[nodeId];
    if (!node) return null;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div className="tree-node">
        <div className={`node-box-circle`} onClick={() => handleNodeClick(node)}>
          <div className="avatar-circle">
            <img src={DEFAULT_AVATAR} alt="avatar" />
          </div>
          <div className="node-id">{node.id}</div>
        </div>
        <div className="node-name">{node.name}</div>

        {node.hasChildren !== false && !isExpanded && (
          <div className="arrow-down-container">
            <button
              className="arrow-down-btn"
              onClick={() => toggleNode(node.id)}
              title="Show Children"
            >
              &#8595;
            </button>
          </div>
        )}

        {isExpanded && node.children.length > 0 && (
          <div className="children binary">
            {node.children.map((childId, idx) => (
              <div key={childId} className={`child-line ${idx === 0 ? "left" : "right"}`}>
                <div className="line"></div>
                {renderTree(childId)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const rootNodeId = rootIdRef.current;

  return (
    <div className="tree-container">
      {error && <div style={{ backgroundColor: "#f8d7da", color: "#721c24", padding: "10px", borderRadius: "4px", marginBottom: "20px" }}>
        <strong>Error:</strong> {error}
      </div>}

      {loading && <div style={{ textAlign: "center", padding: "20px" }}><p>Loading data...</p></div>}

      {!loading && !error && rootNodeId && data[rootNodeId] && (
        <>
          {renderTree(rootNodeId)}
          {isChildView && (
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <button
                className="back-to-root-btn fixed-root-btn"
                onClick={() => {
                  setIsChildView(false);
                  setData({});
                  setExpandedNodes(new Set());
                  setResetFlag(true);
                  navigate("/dashboard-user/my-tree", { replace: true });
                }}
              >
                Back to Root
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && (!rootNodeId || !data[rootNodeId]) && (
        <p style={{ textAlign: "center", color: "#6c757d" }}>No data to display</p>
      )}

      {selectedNode && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="avatar-circle-large">
              <img src={DEFAULT_AVATAR} alt="avatar" />
            </div>
            <div className="popup-id">{selectedNode.id}</div>
            <div className="popup-name">{selectedNode.name}</div>
            <table className="popup-table">
              <tbody>
                {Object.entries(selectedNode).map(([key, value]) =>
                  ["id", "name"].includes(key) ? null : (
                    <tr key={key}>
                      <td className="popup-key">{key}</td>
                      <td className="popup-value">{String(value)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <button className="popup-close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTree;
