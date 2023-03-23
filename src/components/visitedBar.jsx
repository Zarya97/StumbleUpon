function HistorySidebar({ visitedDogs }) {
    return (
      <div className="HistorySidebar">
        <h2>History</h2>
        {visitedDogs.map((dog, index) => (
          <div key={index}>
            <p>{dog.breedName}</p>
            <img className="dogSidebar" src={dog.imageURL} alt="Dog Image" />
          </div>
        ))}
      </div>
    );
  }
  
  export default HistorySidebar;
  