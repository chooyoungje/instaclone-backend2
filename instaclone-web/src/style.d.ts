import "styled-ComponentStyle";

declare module "styled-components" {
  // 이름은 반드시 DefaultTheme이어야 함, styled-components에서 지원하는 인터패이스이기 때문
  export interface DefaultTheme {
    // 타입화하기, 테아에 있던 걸 모두 지정해줘야함
    fontColor?: string;
    accent?: string;
    borderColor?: string;
    bgColor?: string;
  }
}
