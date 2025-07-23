const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor = score > 69 ? "bg-badge-green" : score > 49 ? "bg-badge-yellow" : "bg-badge-red";
  const textColor = score > 69 ? "text-green-600" : score > 49 ? "text-yellow-600" : "text-red-600";
  const badgeText = score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

  return (
    <div className={`score-badge ${badgeColor}`}>
      <p className={`text-xs ${textColor} font-semibold`}>{badgeText}</p>
    </div>
  );
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor = score > 69 ? "text-green-600" : score > 49 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl ">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

export default Category;