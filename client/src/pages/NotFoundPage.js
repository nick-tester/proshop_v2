import React from "react";
import styled from "styled-components";


const NotFoundPage = () => {
    return <Styled>
        <div className="message-box">
            <h2 className="message-title">Page Not Found!</h2>
        </div>
    </Styled>
};

const Styled = styled.div`

    width: 100%;
    height: 80vh;
    background-color: yellow;
    display: flex;

    .message-box {
        margin: auto;
        border: 1px solid black;
        border-radius: 50px;
    }

    .message-title {
        margin: 5px 20px;
    }
`

export default NotFoundPage;