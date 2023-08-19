import React from 'react'
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Media from 'react-bootstrap/Media';
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {

  const {
    profile_id,
    profile_image,
    owner,
    created_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  return (
      <>
        <Media className={styles.Media}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{owner} </span>
            <span className={styles.Date}>{created_at}</span>
            <p>{content}</p>
          </Media.Body>
        </Media>
      </>
  )
};

export default Comment;