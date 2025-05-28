import React from "react";
import ListRow from "./ListRow";

export default function MapResultData({ resultData, columnSetting, onClick }) {
  return (
    <div>
      {resultData?.map((dataList, key) => (
        <ListRow key={key} data={dataList} columnSetting={columnSetting} onClick={() => onClick(dataList.id)} />
      ))}
    </div>
  );
}
