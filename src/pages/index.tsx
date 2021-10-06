import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { TodoList } from "../features/todo/TodoList";

type IndexPageProps = {};

const IndexPage: NextPage<IndexPageProps> = () => {
  return (
    <div>
      <Heading>Index</Heading>
      <TodoList />
    </div>
  );
};

export default IndexPage;
