import { useState } from "react";
import "../style/formflowchartpagestyle.css";
import PublishCard from "../../components/PublishCard";
import ShareCard from "../../components/ShareCard";

function FormFlowChartPage() {
    const [togglePublishCard, setTogglePublishCard] = useState(false);
    const [toggleShareCard, setToggleShareCard] = useState(false);
  return (
    <div className="homepage-container">
      <div className="homepage-title">Title</div>
      <div className="homepage-content"></div>
      <button className="flow-chart-next-button" onClick={() => setTogglePublishCard(true)} >Next</button>
      {togglePublishCard && <PublishCard setTogglePublishCard={setTogglePublishCard} setToggleShareCard={setToggleShareCard} />}
      {toggleShareCard && <ShareCard setToggleShareCard={setToggleShareCard} />}
    </div>
  );
}

export default FormFlowChartPage;
