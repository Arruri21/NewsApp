import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props
        return (
            <div>
                <div className="card my-3" style={{ width: "18rem" } }>
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"90%",zIndex:"1"}}>
                        {source}

                    </span>
                    <img src={imgUrl ? imgUrl : "https://static.toiimg.com/thumb/msid-110598681,width-1070,height-580,imgsize-79970,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}....</h5>
                        <p className="card-text">{description}...</p>
                        <p class="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
