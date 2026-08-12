import "./AIHero.css";

interface AIHeroProps {
  generatedAt: string;
}

const AIHero = ({ generatedAt }: AIHeroProps) => {
  const formattedDate = new Date(generatedAt).toLocaleString();

  return (
    <div className="ai-hero">

      <div className="ai-hero-left">
        <h1>🤖 AI Business Insights</h1>

        <p>
          AI-powered business intelligence for your ShopSmart AI dashboard.
        </p>
      </div>

      <div className="ai-hero-right">
        <div className="generated-card">

          <span className="generated-label">
            Last Generated
          </span>

          <h3>{formattedDate}</h3>

        </div>
      </div>

    </div>
  );
};

export default AIHero;