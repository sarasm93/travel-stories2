import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { Col, Row } from "react-bootstrap";

function CommentCreateForm(props) {
  const { story, setStory, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const { data } = await axiosRes.post("/comments/", {
          content,
          story,
        });
        setComments((prevComments) => ({
          ...prevComments,
          results: [data, ...prevComments.results],
        }));
        setContent("");
        setStory((prevStory) => ({
          results: [
            {
              ...prevStory.results[0],
              comments_count: prevStory.results[0].comments_count + 1,
            },
          ],
        }));
        
    } catch (err) {
      console.log(err);
    }
  };

  return (
        
            <Form className="mt-4 pr-1" onSubmit={handleSubmit}>
                <Row>
                    <Col xs={11} className="p-0">
                        <Form.Group className={`${styles.Form}`}>
                            <InputGroup className={`${styles.FormImage} mr-2`}>
                            <Link to={`/profiles/${profile_id}`}>
                                <Avatar src={profileImage} />
                            </Link>
                            <Form.Control
                                className={`${styles.Form} rounded`}
                                placeholder="Comment here"
                                as="textarea"
                                value={content}
                                onChange={handleChange}
                                rows={2}
                            />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col xs={1} className="pl-0">
                        <div className="d-flex p-0 pt-4 pr-3">
                            <button
                                className={`${styles.PostButton} center-align`}
                                disabled={!content.trim()}
                                type="submit"
                            >
                                <i className="fa-regular fa-paper-plane"></i>
                            </button>
                        </div>
                    </Col>
                </Row>
            </Form>
    );
}

export default CommentCreateForm;