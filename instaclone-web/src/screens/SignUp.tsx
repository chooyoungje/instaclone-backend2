import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import TopBox from "../components/auth/TopBox";
import BottomBox from "../components/auth/ButtomBox";
import { FatLink } from "../components/shared";
import Separator from "../components/Separator";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router-dom";

const FacebookLogin = styled.div`
  color: #385185;
  width: 100%;
  flex-direction: row;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -40px;
`;
const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    # 백엔드와 연결시키기
    createAccount(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
      ok
      error
    }
  }
`;

function SignUp() {
  // 버전 6에선 navigate를 써야함, history가 안 먹힘

  const history = useHistory();
  // 여기서 얻은 data는 뮤테이션에서 얻은 거임
  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    // 회원가입을 완료했으면 로그인 화면으로 보내기 => history API 사용
    // url로 보내면서 객체도 보낼 수 있다
    history.push(routes.home, {
      message: "계정이 생성되었습니다. 로그인 해주세요",
      username,
      password,
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: "onChange" });

  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <TopBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="4x" />
          <SubTitle>Sign up to see photos and videos from your friends.</SubTitle>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            <Button type="submit" value="Log in with Facebook" />
          </FacebookLogin>
          <Separator />
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: true,
            })}
            type="text"
            placeholder="First Name"
            hasError={false}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...register("lastName", {
              required: true,
            })}
            type="text"
            placeholder="Last Name"
            hasError={false}
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            {...register("email", {
              required: true,
              validate: async (currentValue) => currentValue.includes("@"),
            })}
            type="text"
            placeholder="Email"
            hasError={false}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("username", {
              required: true,
            })}
            type="text"
            placeholder="Username"
            hasError={false}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="Password"
            hasError={false}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value={loading ? "Loading..." : "Sign Up"} disabled={!isValid || loading} />
        </form>
      </TopBox>
      <BottomBox cta="계정이 있으신가요? " link={routes.home} linkText=" Login" />
    </AuthLayout>
  );
}

export default SignUp;
