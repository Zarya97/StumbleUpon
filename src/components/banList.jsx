
function BanSidebar({ bannedTemperaments, setBannedTemperaments }) {
  const handleUnbanClick = (temperament) => {
    setBannedTemperaments(bannedTemperaments.filter((temp) => temp !== temperament));
  };

  return (
    <div className="BanSidebar">
      <h2>Ban List</h2>
      <div>
        {bannedTemperaments &&
          bannedTemperaments.map((temp, index) => (
            <button key={index} onClick={() => handleUnbanClick(temp)}>
              {temp}
            </button>
          ))}
      </div>
    </div>
  );
}

export default BanSidebar;
