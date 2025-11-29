import React from 'react'
import Tree from './Tree'
import './tree.css'

export default function EnrollerTree() {
  return (
    <>
    <section className="tree">
        <div className="container-fluid">
            <div className="row">
                <Tree/>
            </div>
        </div>
    </section>
    </>
  )
}
