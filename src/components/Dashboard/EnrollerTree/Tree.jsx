import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./tree.css";
import { baseURL } from "../../../utils/baseURL";
import DEFAULT_AVATAR from "../../../assets/profile.png";

const API_URL = `${baseURL}/CustomerInfo/GetCustomerNetwork`;

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

  const getRootId = () => {
    const authData = localStorage.getItem("dataAuth");
    if (!authData) return null;
    const auth = JSON.parse(authData);
    return auth.customerAttributeId || auth.referId || null;
  };

  const fetchNetworkData = async (ParentId, retryCount = 0) => {
    if (!ParentId) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setLoading(true);
    setError(null);

    try {
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      const response = await fetch(
        `${API_URL}?ParentId=${ParentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal,
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const result = await response.json(); // 👈 الريسبونس Array مباشر

      const dataUser = JSON.parse(localStorage.dataAuth);
      const newData = {};

      // إنشاء الأب (Parent)
      newData[ParentId] = {
        id: ParentId,
        name: dataUser.name,
        email: dataUser.email,
        mobile: dataUser.mobile,
        children: {
          left: null,
          right: null,
        },
        hasChildren: result.length > 0,
      };

      // إنشاء الأبناء (Binary)
      result.forEach((item) => {
        const childId = item.childId;

        newData[childId] = {
          id: childId,
          name: item.childName,
          email: item.childEmail,
          mobile: item.mobile,
          children: {
            left: null,
            right: null,
          },
          hasChildren: true,
        };

        if (item.handSide === "Left") {
          newData[ParentId].children.left = childId;
        } else if (item.handSide === "Right") {
          newData[ParentId].children.right = childId;
        }
      });

      setData((prev) => ({ ...prev, ...newData }));
      setExpandedNodes((prev) => new Set(prev).add(ParentId));
      if (ParentId !== rootIdRef.current) setIsChildView(true);
    } catch (err) {
      if (retryCount < 2) {
        setTimeout(() => fetchNetworkData(ParentId, retryCount + 1), 1500);
      } else {
        setError("Failed to load network data");
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
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (resetFlag && rootIdRef.current) {
      fetchNetworkData(rootIdRef.current);
      setResetFlag(false);
    }
  }, [resetFlag]);

  const toggleNode = async (nodeId) => {
    if (expandedNodes.has(nodeId)) {
      const s = new Set(expandedNodes);
      s.delete(nodeId);
      setExpandedNodes(s);
    } else {
      await fetchNetworkData(nodeId);
    }
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const closePopup = () => setSelectedNode(null);

  const renderTree = (nodeId) => {
    const node = data[nodeId];
    if (!node) return null;

    const isExpanded = expandedNodes.has(nodeId);

    return (
      <div className="tree-node">
        <div className="node-box-circle" onClick={() => handleNodeClick(node)}>
          <div className="avatar-circle">
            <img src={DEFAULT_AVATAR} alt="avatar" />
          </div>
          <div className="node-id">{node.id}</div>
        </div>

        <div className="node-name">{node.name}</div>

        {node.hasChildren && !isExpanded && (
          <div className="arrow-down-container">
            <button
              className="arrow-down-btn"
              onClick={() => toggleNode(node.id)}
            >
              ↓
            </button>
          </div>
        )}

        {isExpanded && (
          <div className="children binary">
            {[node.children.left, node.children.right].map(
              (childId, idx) =>
                childId && (
                  <div
                    key={childId}
                    className={`child-line ${idx === 0 ? "left" : "right"}`}
                  >
                    <div className="line"></div>
                    {renderTree(childId)}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
  };

  const rootNodeId = rootIdRef.current;
  const allowedKeys = ["email", "mobile"];

  return (
    <div className="tree-container">
      {error && <div className="error-box">{error}</div>}

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {!loading && rootNodeId && data[rootNodeId] && (
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
                {Object.entries(selectedNode)
                  .filter(([key]) => allowedKeys.includes(key))
                  .map(([key, value]) => (
                    <tr key={key}>
                      <td className="popup-key">{key}</td>
                      <td className="popup-value">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button className="popup-close-btn" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkTree;
