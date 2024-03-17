import { useState } from "react";
import {
  View,
  SplitLayout,
  SplitCol,
  Panel,
  PanelHeader,
  usePlatform,

  Group,
  Cell,
  PanelHeaderBack,

} from "@vkontakte/vkui";
import { Icon24PawOutline, Icon24UserOutgoing } from "@vkontakte/icons";

import { FactPage } from "../src/entities/fact/ui/";
import { AgePage } from "./entities/age/ui";

// import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

// import { Persik, Home } from "./panels";
// import { DEFAULT_VIEW_PANELS } from "./routes";

export const App = () => {
  const [activePanel, setActivePanel] = useState("main");

  const platform = usePlatform();

  return (
    <SplitLayout
      header={platform !== "vkcom" && <PanelHeader delimiter="none" />}
    >
      <SplitCol autoSpaced>
        <View activePanel={activePanel}>
          <Panel id="main">
            <PanelHeader>Выберите приложение</PanelHeader>
            <Group>
              <Cell
                expandable="auto"
                before={<Icon24PawOutline />}
                onClick={() => setActivePanel("catsFacts")}
              >
                Cats Fact
              </Cell>
              <Cell
                expandable="auto"
                before={<Icon24UserOutgoing />}
                onClick={() => setActivePanel("EstimatesAge")}
              >
                Estimates the age
              </Cell>
            </Group>
          </Panel>
          <Panel id="catsFacts">
            <PanelHeader
              delimiter="spacing"
              before={
                <PanelHeaderBack onClick={() => setActivePanel("main")} />
              }
            >
              Cats Facts
            </PanelHeader>
            <FactPage></FactPage>
          </Panel>
          <Panel id="EstimatesAge">
            <PanelHeader
              delimiter="spacing"
              before={
                <PanelHeaderBack onClick={() => setActivePanel("main")} />
              }
            >
              Estimates the age
            </PanelHeader>
            <AgePage></AgePage>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};

{
  /* <SplitLayout popout={popout}>
  <SplitCol autoSpaced>
    <View activePanel={activePanel}>
      <Home id="home" fetchedUser={fetchedUser} />
      <Persik id="persik" />
    </View>
  </SplitCol>
</SplitLayout>; */
}
