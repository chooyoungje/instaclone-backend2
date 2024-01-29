import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PHOTO_FRAGMENT } from "../fragment";
import { styled } from "styled-components";
import { FatText } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { query } from "express";
import useUser from "../hooks/useUser";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      id
      ok
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unFollowUser($username: String!) {
    unFollowUser(username: $username) {
      id
      ok
    }
  }
`;

interface ParamsType {
  username: string;
}

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg: string }>`
  background-image: url(${(props: any) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileButton = styled(Button).attrs({
  as: "span",
})`
  margin-left: 20px;
  margin-top: 0px;
  cursor: pointer;
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      photos {
        ...PhotoFragment
      }
      firstName
      lastName
      username
      bio
      avatar
      totalFollowing
      totalFollowers
      isFollowing
      isMe
    }
  }
  ${PHOTO_FRAGMENT}
`;

function Profile() {
  const { username }: ParamsType = useParams();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  const UnfollowUserUpdate = (cache: any, result: any) => {
    const {
      data: {
        unFollowUser: { ok },
      },
    } = result;
  };
  const [UnfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: UnfollowUserUpdate,
  });

  const followUserCompleted = (data: any) => {
    const {
      followUser: { ok },
    } = data;
  };
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    onCompleted: followUserCompleted,
  });

  const getButton = (seeProfile: any) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileButton>Edit Profile</ProfileButton>;
    }
    if (isFollowing) {
      return <ProfileButton onClick={() => UnfollowUser()}>Unfollow</ProfileButton>;
    } else {
      return <ProfileButton onClick={() => followUser()}>Follow</ProfileButton>;
    }
  };
  return (
    <div>
      <PageTitle title={loading ? "Loading" : `${data?.seeProfile?.username}'s Profile`} />
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map((photo: any) => (
          <Photo key={photo.id} bg={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
}

export default Profile;
