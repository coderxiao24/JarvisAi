import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { ProChat, type Locale, ProChatInstance } from "@ant-design/pro-chat";
import { Segmented, Modal, Row, Col, Avatar, Radio, Flex } from "antd";
import { PhoneTwoTone, MailTwoTone } from "@ant-design/icons";

import { fetchEventSource } from "@microsoft/fetch-event-source";

import _ from "lodash";

export default () => {
  const [language, setLanguage] = useState<Locale>("zh-CN");
  const chatRef = useRef<ProChatInstance>();
  const [model, setModel] = useState(1);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          语言：
          <Segmented<Locale>
            options={["zh-CN", "en-US", "zh-HK"]}
            defaultValue="zh-CN"
            onChange={(v) => {
              setLanguage(v);
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          模型:
          <Radio.Group
            onChange={(e) => {
              setModel(e.target.value);
            }}
            value={model}
            options={[
              {
                value: 1,
                label: (
                  <Flex gap="small" justify="center" align="center" vertical>
                    <img
                      src="/qianwen.svg"
                      style={{ height: "30px", width: "30px" }}
                    />
                    qwen2(1.5b)
                  </Flex>
                ),
              },
              {
                value: 2,
                label: (
                  <Flex gap="small" justify="center" align="center" vertical>
                    <img
                      src="/deepseek.svg"
                      style={{ height: "30px", width: "30px" }}
                    />
                    DeepSeek-R1(8B)
                  </Flex>
                ),
              },
            ]}
          />
        </Col>
      </Row>

      <div style={{ flex: 1 }}>
        {model === 1 ? (
          <ProChat
            locale={language}
            helloMessage={"你好，我是托尼的贾维斯，有什么问题吗小蜘蛛？"}
            actions={{
              render: (defaultDoms) => {
                return [
                  <div>
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
                    </a>
                    <a
                      style={{ marginLeft: "2em" }}
                      key="download"
                      href="https://xiaokaixuan.com/xkx/xkxAi.apk"
                      download="xkxAi.apk"
                    >
                      下载应用
                    </a>
                  </div>,
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
                  body: JSON.stringify({ messages, model }),
                  openWhenHidden: true,

                  onmessage(event) {
                    if (event.data.length !== 0) {
                      if (event.data === "[DONE]") {
                        controller.desiredSize > 0 && controller.close();
                        return;
                      }
                      const data = JSON.parse(event.data);
                      if (data.choices[0].finish_reason === "stop") {
                        controller.desiredSize > 0 && controller.close();
                        return;
                      }
                      if (data.choices[0].delta.content) {
                        controller.enqueue(
                          encoder.encode(data.choices[0].delta.content)
                        );
                      }
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
        ) : (
          <ProChat
            chatRef={chatRef}
            locale={language}
            helloMessage={"你好，我是DeepSeek-R1(8B)，有什么问题吗？"}
            actions={{
              render: (defaultDoms) => {
                return [
                  <div>
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
                    </a>
                    <a
                      style={{ marginLeft: "2em" }}
                      key="download"
                      href="https://xiaokaixuan.com/xkx/xkxAi.apk"
                      download="xkxAi.apk"
                    >
                      下载应用
                    </a>
                  </div>,
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
              avatar: "/userAvatar1.svg",
              title: "用户",
            }}
            assistantMeta={{
              avatar: "/aiAvatar.svg",
              title: "DeepSeek",
            }}
            request={async (messages: any) => {
              const encoder = new TextEncoder();
              function start(controller) {
                let thinking = false;
                fetchEventSource("/xkx/chat", {
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  body: JSON.stringify({ messages, model }),
                  openWhenHidden: true,

                  onmessage(event) {
                    if (event.data.length !== 0) {
                      if (event.data === "[DONE]") {
                        controller.desiredSize > 0 && controller.close();
                        return;
                      }

                      const data = JSON.parse(event.data);

                      if (data.choices[0].finish_reason === "stop") {
                        controller.desiredSize > 0 && controller.close();
                        return;
                      }

                      if (data.choices[0].delta.reasoning_content) {
                        if (!thinking)
                          controller.enqueue(
                            encoder.encode("--- \n思考开始\n\n```\n")
                          );

                        thinking = true;

                        controller.enqueue(
                          encoder.encode(
                            data.choices[0].delta.reasoning_content
                          )
                        );
                      }

                      if (data.choices[0].delta.content) {
                        if (thinking) {
                          controller.enqueue(
                            encoder.encode("\n```\n思考结束\n\n---")
                          );
                        }
                        thinking = false;

                        controller.enqueue(
                          encoder.encode(data.choices[0].delta.content)
                        );
                      }
                    }
                  },
                  onerror(error) {
                    controller.error(error);
                    controller.desiredSize > 0 && controller.close();
                  },
                  onclose(msg) {
                    controller.error("结束了", msg);
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
        )}
      </div>
    </div>
  );
};
