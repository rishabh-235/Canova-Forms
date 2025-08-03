import { useState, useMemo } from "react";
import "../style/formflowchartpagestyle.css";
import PublishCard from "../../components/PublishCard";
import ShareCard from "../../components/ShareCard";
import { useSelector } from "react-redux";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
function FormFlowChartPage() {
  const [togglePublishCard, setTogglePublishCard] = useState(false);
  const [toggleShareCard, setToggleShareCard] = useState(false);
  const { currentForm } = useSelector((state) => state.form);
  const [publishLink, setPublishLink] = useState("");
  const { pages } = currentForm || {};
  const calculateNodePosition = (pageNumber, totalPages) => {
    const baseX = 250;
    const baseY = 0;
    const offsetX = 200;
    const offsetY = 100;
    if (pageNumber === 1) {
      return { x: baseX, y: baseY };
    }
    const row = Math.floor((pageNumber - 1) / 3);
    const col = (pageNumber - 1) % 3;
    return {
      x: baseX + (col - 1) * offsetX,
      y: baseY + (row + 1) * offsetY,
    };
  };
  const convertPagesToFlowChart = (pages) => {
    if (!pages || pages.length === 0) {
      return { nodes: [], edges: [] };
    }
    const nodes = [];
    const edges = [];
    pages.forEach((page, index) => {
      const nodeId = page.pageNumber.toString();
      const nodeType = index === 0 ? "input" : "default";
      const node = {
        id: nodeId,
        type: nodeType,
        data: { label: `Page ${page.pageNumber.toString().padStart(2, "0")}` },
        position: calculateNodePosition(page.pageNumber, pages.length),
      };
      nodes.push(node);
      if (page.truePage !== null && page.truePage !== undefined) {
        const trueEdge = {
          id: `e${nodeId}-true-${page.truePage}`,
          source: nodeId,
          target: page.truePage.toString(),
          label: "True",
          style: { strokeDasharray: "4" },
        };
        edges.push(trueEdge);
      }
      if (page.falsePage !== null && page.falsePage !== undefined) {
        const falseEdge = {
          id: `e${nodeId}-false-${page.falsePage}`,
          source: nodeId,
          target: page.falsePage.toString(),
          label: "False",
          style: { strokeDasharray: "4" },
        };
        edges.push(falseEdge);
      }
    });
    return { nodes, edges };
  };
  const { nodes, edges } = useMemo(() => {
    return convertPagesToFlowChart(pages);
  }, [pages]);
  return (
    <div className="homepage-container">
      <div className="homepage-title">{currentForm?.formTitle}</div>
      <div className="homepage-content">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={true}
          panOnScroll={true}
          zoomOnPinch={true}
          panOnDrag={false}
          selectNodesOnDrag={false}
          fitViewOptions={{ padding: 0.2, maxZoom: 0.8 }}
        >
          <Background />
        </ReactFlow>
      </div>
      <button
        className="flow-chart-next-button"
        onClick={() => setTogglePublishCard(true)}
      >
        Next
      </button>
      {togglePublishCard && (
        <PublishCard
          formTitle={currentForm?.formTitle}
          setTogglePublishCard={setTogglePublishCard}
          setToggleShareCard={setToggleShareCard}
          setPublishLink={setPublishLink}
        />
      )}
      {toggleShareCard && <ShareCard setToggleShareCard={setToggleShareCard} publishLink={publishLink} />}
    </div>
  );
}
export default FormFlowChartPage;



