import * as AWS from "aws-sdk";

// AWS에 로그인 하기
AWS.config.update({
  //credentials : 권한을 받을지 확인하는 자격요건
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

// 파일이 어디에 저장되어있는지 알려주는 url을 리턴하는 함수
export const uploadToS3 = async (file, userId, folderName) => {
  const { fileName, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${fileName}`;
  // 파일 이름 만들기, 폴더 이름을 파일이름에 붙여서 보내면 폴더가 만들어짐
  // 사진 업로드 폴더 :
  // 아바타 업로드 폴더 따로 만들기
  console.log("AWS 가기 전");
  const upload = await new AWS.S3()
    .upload({
      Bucket: "chooinstaclone-uploader",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  // await를 쓸거하면 마지막에  .promise(); 를 붙여줘야함
  console.log("AWS 갔다 온 후" + upload);
  return upload.Location;
};

//Key는 파일의 이름
// Bucket : 내가 만든 버킷의 이름 넣기
// ACL : 객체의 프라이버시를 말함, "public-read" : 아무나 read할 수 있다
// Body : 파일을 씀
