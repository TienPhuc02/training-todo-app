import { Divider } from "antd";
import Header from "./block/Header";
import TableTasks from "./block/TableTasks";

function App() {
  return (
    <div className=" min-h-screen pt-[3rem]">
      <div className="container-main max-w-[100rem] w-[80rem] h-[50rem] border mx-auto p-[1.5rem] rounded-[1rem] ">
        <Header />
        <Divider />
        <TableTasks />
      </div>
    </div>
  );
}

export default App;
