import { History } from "@/components/history/history";
import { FC } from "react";

import recyclingData from "@/data/history.json";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <History records={recyclingData.records}></History>
    </div>
  );
};

export default page;
