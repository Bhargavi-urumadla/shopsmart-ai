import "./AISummaryCard.css";

interface AISummaryCardProps {
  summary: string;
}

const AISummaryCard = ({ summary }: AISummaryCardProps) => {
  return (
    <div className="ai-summary-card">
      <div className="summary-header">
        <h2>🤖 AI Executive Summary</h2>
      </div>

      <div className="summary-content">
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default AISummaryCard;