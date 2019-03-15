import React,{Component} from 'react';

export default class Slider extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className='container'>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://do.ngs24.ru/preview//do/62b7b17f449581097045a09412522b52_1521690584_1000_562.jpg" alt="First slide"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>1</h5>
                                <p>1</p>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://do.ngs24.ru/preview//do/62b7b17f449581097045a09412522b52_1521690584_1000_562.jpg" alt="Second slide"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>2</h5>
                                <p>2</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://do.ngs24.ru/preview//do/62b7b17f449581097045a09412522b52_1521690584_1000_562.jpg" alt="Third slide"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>3</h5>
                                <p>3</p>
                            </div>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}