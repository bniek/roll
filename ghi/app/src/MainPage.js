function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1', fontSize: '7rem'}} className="display-5 fw-bold">ROLL</h1>
      <div style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1' }} className="col-lg-6 mx-auto">
      </div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
        <div className="carousel-item active" style={{ height: "80vh" }}>
          <a href= "http://localhost:3000/automobiles" >
            <img src="https://images.pexels.com/photos/2739286/pexels-photo-2739286.jpeg?auto=compress&cs=tinysrgb&w=800" className="d-block w-100" alt="pink vintage car with hood open and headlights" />
          </a>
          <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', color: 'white', padding: '10px' }}>
            <h1 className="carousel_header">INVENTORY</h1>
            <p>Keep track of your dealership's inventory</p>
        </div>
        </div>
        <div className="carousel-item" style={{ height: "80vh" }}>
          <a href = "http://localhost:3000/appointments">
            <img src="https://images.pexels.com/photos/1768826/pexels-photo-1768826.jpeg?auto=compress&cs=tinysrgb&w=800" className="d-block w-100" alt="side of dark green car parked infront of greenery" />
          </a>
          <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white', padding: '10px' }}>
            <h1 className="carousel_header">SERVICE</h1>
            <p>Manage clients' appointments</p>
          </div>
        </div>
        <div className="carousel-item" style={{ height: "80vh" }}>
          <a href = "http://localhost:3000/sales/">
            <img src="https://images.pexels.com/photos/1974520/pexels-photo-1974520.jpeg?auto=compress&cs=tinysrgb&w=1600" className="d-block w-100" alt="whit old fashioned cadillac with palm trees in the background" />
          </a>
          <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: 'white', padding: '10px' }}>
          <h1 className="carousel_header">SALES</h1>
          <p>Manage all sales</p>
        </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  );
}
export default MainPage;
