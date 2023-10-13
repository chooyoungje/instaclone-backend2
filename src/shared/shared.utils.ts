import * as AWS from "aws-sdk";

// AWS에 로그인 하기
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

// 파일이 어디에 저장되어있는지 알려주는 url을 리턴하는 함수
export const uploadPhoto = async (file, userId) => {
  const { fileName, createReadStream } = await file
 const readStream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${fileName}`
  await new AWS.S3().upload({

    Bucket: "chooinstaclone-uploader",
    Key: objectName,
    ACL: "public-read",
    Body: readStream
  }).promise();
return ""
};

//Key는 파일의 이름
// Bucket : 내가 만든 버킷의 이름 넣기
// ACL : 객체의 파이버시를 말함
// Body : 파일을 씀


