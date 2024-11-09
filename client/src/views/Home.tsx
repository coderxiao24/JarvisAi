import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { ProChat, type Locale } from "@ant-design/pro-chat";
import { Segmented, Modal, Row, Col } from "antd";
import { PhoneTwoTone, MailTwoTone } from "@ant-design/icons";

import { fetchEventSource } from "@microsoft/fetch-event-source";

import _ from "lodash";

export default () => {
  const [language, setLanguage] = useState<Locale>("zh-CN");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Segmented<Locale>
        options={["zh-CN", "en-US", "zh-HK"]}
        defaultValue="zh-CN"
        onChange={(v) => {
          setLanguage(v);
        }}
      />
      <div style={{ flex: 1 }}>
        <ProChat
          locale={language}
          helloMessage={"你好，我是托尼的贾维斯，有什么问题吗小蜘蛛？"}
          // initialChats={[
          //   {
          //     content: "昨天的当天是明天的什么？",
          //     id: "ZGxiX2p4",
          //     role: "user",
          //   },
          //   {
          //     content: "昨天的当天是明天的昨天。",
          //     id: "Sb5pAzLL",
          //     role: "assistant",
          //   },
          // ]}
          actions={{
            render: (defaultDoms) => {
              return [
                <a
                  key="user"
                  onClick={() => {
                    Modal.info({
                      okText: "好的",
                      closable: true,
                      maskClosable: true,
                      title: "有问题反馈？",
                      width: 320,
                      content: (
                        <>
                          <Row gutter={16}>
                            <Col span={6} style={{ textAlign: "right" }}>
                              <PhoneTwoTone /> :
                            </Col>
                            <Col span={18}>13140022101（微信同号）</Col>
                          </Row>
                          <Row gutter={16}>
                            <Col span={6} style={{ textAlign: "right" }}>
                              <MailTwoTone /> :
                            </Col>
                            <Col span={18}>xiaokaixuan24@163.com</Col>
                          </Row>
                        </>
                      ),
                      icon: null,
                    });
                  }}
                >
                  联系托尼
                </a>,
                ...defaultDoms,
              ];
            },
            flexConfig: {
              gap: 16,
              direction: "horizontal",
              justify: "space-between",
            },
          }}
          showTitle
          userMeta={{
            avatar: "/userAvatar.svg",
            title: "小蜘蛛",
          }}
          assistantMeta={{
            avatar: "/aiAvatar.svg",
            title: "贾维斯",
          }}
          request={async (messages: any) => {
            const encoder = new TextEncoder();
            function start(controller) {
              fetchEventSource("/xkx/chat", {
                headers: { "Content-Type": "application/json" },
                method: "post",
                body: JSON.stringify({ messages }),
                openWhenHidden: true,
                onmessage(event) {
                  if (event.data.length !== 0) {
                    const data = JSON.parse(event.data);
                    if (data.output.choices[0].finish_reason !== "null") {
                      controller.desiredSize > 0 && controller.close();
                      return;
                    }
                    controller.enqueue(
                      encoder.encode(data.output.choices[0].message.content)
                    );
                  }
                },
                onerror(error) {
                  controller.error(error);
                  controller.desiredSize > 0 && controller.close();
                },
                onclose(msg) {
                  controller.desiredSize > 0 && controller.close();
                },
              });
            }
            const readableStream = new ReadableStream({
              start,
            });
            return new Response(readableStream);
          }}
        />
      </div>
    </div>
  );
};
