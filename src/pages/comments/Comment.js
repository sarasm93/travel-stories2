import React, { useState } from 'react'
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Media from 'react-bootstrap/Media';
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from "./CommentEditForm";


const Comment = (props) => {

  const {
    profile_id,
    profile_image,
    owner,
    created_at,
    content,
    id,
    setStory,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setStory((prevStory) => ({
        results: [
          {
            ...prevStory.results[0],
            comments_count: prevStory.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // comment to prevent eslint error about empty block
    }
  };

  return (
      <>
        <Media className={styles.Media}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="align-self-center ml-2">
            <span className={styles.Owner}>{owner} </span>
            <span className={styles.Date}>{created_at}</span>
            {showEditForm ? (
              <CommentEditForm 
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
            />
            ) : (
              <p>{content}</p>
            )}
          </Media.Body>
          {is_owner && !showEditForm && (
            <MoreDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </Media>
      </>
  )
};

export default Comment;