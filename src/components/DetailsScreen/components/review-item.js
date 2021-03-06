import React from "react";
import { findImage } from "../../../actions/common-action";
import { Rating } from "react-simple-star-rating";
import "./review-item.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../../actions/review-action";
import { Link } from "react-router-dom";

const ReviewItem = ({
  reviewItem = {
    authorName: "SANDEEP BASU",
    profilePhotoUrl:
      "https://lh3.googleusercontent.com/a-/AOh14GgYpi8WWJX--p7f_7wkq5Wa5GQYeogAOYVKSlk5pw=s128-c0x00000000-cc-rp-mo",
    rating: 4,
    text: "Huntington YMCA is a great place to do fitness activities. I recently joined a swimming class (beginner level) and loved it totally! Very clean swimming pool, great instructor, and staffs are friendly. I am going to enroll for another 8 weeks of swimming lessons in the new year (2022)!",
  },
}) => {
  const user = useSelector(({ userStore }) => userStore);

  const placeId = useSelector(({ placeDetail }) => placeDetail.placeId);

  const dispatch = useDispatch();
  const deleteReviewHandler = (review) => {
    deleteReview(dispatch, reviewItem.postedBy["username"], placeId, review);
  };

  return (
    <>
      <div className="card">
        <div className="card-body d-flex flex-column gap-2">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-4">
              <div className="d-flex align-items-center">
                <img
                  src={
                    reviewItem?.profilePhotoUrl
                      ? findImage(reviewItem.profilePhotoUrl)
                      : reviewItem?.postedBy?.profilePhotoURL
                      ? reviewItem?.postedBy?.profilePhotoURL
                      : "https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=480:*"
                  }
                  alt={reviewItem.authorName || reviewItem?.postedBy?.username}
                  className="img rounded-circle img-fluid review-profile-avatar"
                />
              </div>
              <div className="d-flex align-self-center align-items-start flex-column">
                <span className="mx-1">
                  <span>
                    {reviewItem.authorName || (
                      <Link
                        to={`/profile/${reviewItem?.postedBy?.username}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {reviewItem?.postedBy?.username}
                      </Link>
                    )}
                  </span>
                </span>

                <div>
                  <Rating
                    readonly={true}
                    allowHover={false}
                    initialValue={0}
                    ratingValue={(reviewItem.rating / 5) * 100}
                    size="30"
                  />
                </div>
              </div>
            </div>
            <div>
              <span className="align-items-end">
                {(reviewItem.postedBy &&
                  user.username === reviewItem?.postedBy["username"]) ||
                user.role == "mod" ||
                user.role == "admin" ? (
                  <span
                    className="float-end"
                    onClick={() => deleteReviewHandler(reviewItem)}
                  >
                    <i class="fas fa-times"></i>
                  </span>
                ) : (
                  <></>
                )}
              </span>
            </div>
          </div>

          <div className="">
            <div>
              <p>{reviewItem.text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
