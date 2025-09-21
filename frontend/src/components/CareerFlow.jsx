// client/src/components/CareerFlow.jsx
import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import 'reactflow/dist/style.css';
import { motion } from "framer-motion";

/**
 * mapping expected:
 * {
 *  industries: ["IT", "Pharma"],
 *  govtExams: ["CSIR-NET"],
 *  jobs: [{title, why}, ...],
 *  higherEducation: ["M.Sc."],
 *  entrepreneurship: ["Startup idea"],
 * }
 */

function makeNodesAndEdges(mapping, rootLabel) {
  // root at top center
  const leftX = 50;
  const gapX = 220;
  const topY = 40;
  const catY = 180;
  const subStartY = 260;
  const categories = [
    { id: "industries", label: "Industries", items: mapping.industries || [] },
    { id: "govtExams", label: "Government Exams", items: mapping.govtExams || [] },
    { id: "jobs", label: "Jobs", items: (mapping.jobs || []).map(j => typeof j === "string" ? j : j.title) },
    { id: "higherEducation", label: "Higher Education", items: mapping.higherEducation || [] },
    { id: "entrepreneurship", label: "Entrepreneurship", items: mapping.entrepreneurship || [] }
  ];

  const rootNode = { id: "root", position: { x: 400, y: topY }, data: { label: rootLabel }, style: { background: "#fff" } };

  // category nodes
  const nodes = [rootNode];
  const edges = [];
  categories.forEach((cat, idx) => {
    const x = leftX + idx * gapX + 100;
    nodes.push({
      id: cat.id,
      data: { label: cat.label },
      position: { x, y: catY },
      style: { borderRadius: 8, padding: 8, background: "#F3F4F6", border: "1px solid #e5e7eb" }
    });
    edges.push({ id: `e-root-${cat.id}`, source: "root", target: cat.id, animated: true, style: { stroke: '#6366f1' } });

    // subitems (placed below category)
    cat.items.forEach((it, i) => {
      const subId = `${cat.id}-item-${i}`;
      nodes.push({
        id: subId,
        data: { label: it },
        position: { x: x - 80 + (i % 2) * 140, y: subStartY + Math.floor(i / 2) * 70 },
        style: { background: "#fff", border: "1px solid #ddd", borderRadius: 6, padding: 6 }
      });
      edges.push({ id: `e-${cat.id}-${subId}`, source: cat.id, target: subId, animated: false });
    });
  });

  return { nodes, edges };
}

export default function CareerFlow({ mapping, rootLabel }) {
  const { nodes, edges } = useMemo(() => makeNodesAndEdges(mapping, rootLabel), [mapping, rootLabel]);

  return (
    <div style={{ width: "100%", height: "100%", background: "white", borderRadius: 8, padding: 12 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition="bottom-left">
        <Background gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
