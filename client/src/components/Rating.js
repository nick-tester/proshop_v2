import React from "react";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";


const Rating = ({ value, text, color = "gold" }) => {
    return (
        <div className="rating">
            <span style={{ color }}>
                {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span style={{ color }}>
                {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <small style={{ fontWeight: "900", marginLeft: "5px" }}>{ } {text && text}</small>
        </div>
    )
};

export default Rating;