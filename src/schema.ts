import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
// typeDefs
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
export const typeDefs = mergeTypeDefs(loadedTypes);

// resolvers
/**
 * , 붙어있어야 콘솔로그가 찍힌다
 * 여기서 {resolvers} 이렇게 쓰면 실행이 안됨
 */
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);
export const resolvers = mergeResolvers(loadedResolvers);
