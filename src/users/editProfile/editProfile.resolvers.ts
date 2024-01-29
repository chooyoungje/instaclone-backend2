import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client }
) => {
  console.log("로그인 유저" + loggedInUser, avatar);
  let avatarUrl = null;
  if (avatar) {
    // 파일 이름을 loggedInUser.id 기반으로 만들어야 하기 떄문에
    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
    // const { filename, createReadStream } = await avatar;
    // // 파일에 고유한 이름 부여해주기 (같은 이름의 파일이 들어왔을 때 충돌 방지용)
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    // // 모든 파일을 stream에서 받기(스트림 읽기)
    // const readStream = createReadStream();
    // // uploads 파일에 저장하기(폴더에 스트림 쓰기)
    // const writeStream = createWriteStream(process.cwd + "/uploads/" + newFilename);

    // // pipe 연결하기, 하나의 스트림을 다른 스트림으로 보내기
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

  let updatedPassword = null;
  if (newPassword) {
    updatedPassword = await bcrypt.hash(newPassword, 13);
  }
  const updatedUser = await client.user.update({
    where: { id: loggedInUser.id },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(updatedPassword && { password: updatedPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "프로필 수정 불가능",
    };
  }
};

const resolvers = {
  Upload: require("graphql-upload-ts").GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

export default resolvers;
