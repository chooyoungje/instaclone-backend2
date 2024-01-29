import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Separator from "../components/Separator";
import Input from "../components/auth/Input";
import TopBox from "../components/auth/TopBox";
import BottomBox from "../components/auth/ButtomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import Notification from "../components/auth/Notification";

const FacebookLogin = styled.div`
  color: #385185;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;
// interface LoginState {
//   state: {
//     username?: string;
//     password?: string;
//     message?: string;
//   };
// }

function Login() {
  const location = useLocation<any>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues, // 내가  필요한 값을 가져와줌
    setError, // 에러를 내가 다룰 수 있게 해줌
    clearErrors, // 특정 에러를 지울 수 있게 해줌
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
      result: "",
    },
  });
  // hook을 이용하여 뮤테이션 사용하기
  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", { message: error });
    }
    // 위와 같이 에러 처리를 프론트에서 어느 정도 하면 백엔드에서 에러를 보내지 않게 해서 백엔드의 부담을 줄일 수 있다. 그리고 에러를 내가 원하는 형태로 다룰 수 있다
    if (token) {
      console.log(token);
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
    // 함수이면서 동시에 매개변수로써 데이터를 제공해준다
  });
  // useMutation의 첫번째 인자값은(login)은 내 뮤테이션을 활성화시키는 함수임
  // loading : 뮤테이션이 잘 전송됐는지 확인
  const onSubmitValid = (data: any) => {
    if (loading) {
      // 이미 로딩 중이라면 다시 로그인 작업 실행하지 않기
      return;
    }
    const { username, password } = getValues();
    // getValues : 내가 form에 작성한 값들을 가져와줌
    if (username === null) {
    } else {
      login({
        // useMutation의 login 함수 사용하기
        variables: {
          username,
          password,
        },
      });
    }
  };

  const clearLoginErrors = () => clearErrors("result");

  return (
    <>
      <AuthLayout>
        <PageTitle title="Login" />
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <Notification>{location?.state?.message}</Notification>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("username", {
                required: true,
                minLength: {
                  value: 5,
                  message: "반드시 5글자는 넘어야 합니다",
                },
              })}
              type="text"
              placeholder="username"
              hasError={Boolean(errors?.username?.message)}
              onFocus={clearLoginErrors}
            />
            <FormError message={errors?.username?.message?.toString()} />

            <Input
              {...register("password", {
                required: true,
                // minLength: {
                //   value: 9,
                //   message: "최소 9글자 이상이어야합니다",
                // },
              })}
              type="password"
              placeholder="password"
              hasError={Boolean(errors?.password?.message)}
              onFocus={clearLoginErrors}
              // 에러에 따라 input 에게도 변화를 주기 위해 hashError라는 변수를 사용하기
            />
            <FormError message={errors?.password?.message?.toString()} />
            {/* 에러 메시지 설정도 가능함 */}
            <Button type="submit" value={loading ? "Loading" : "Login"} disabled={!isValid || loading} />

            <FormError message={errors?.result?.message?.toString()} />
          </form>
          <Separator />
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            <span>Log in with FaceBook</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox cta="계정이 없으신가요? " link={routes.signUp} linkText=" Sign Up" />
      </AuthLayout>
    </>
  );
}

export default Login;
