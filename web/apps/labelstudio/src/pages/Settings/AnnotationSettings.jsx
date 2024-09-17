import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../components";
import { Form, TextArea, Toggle } from "../../components/Form";
import { MenubarContext } from "../../components/Menubar/Menubar";
import { Block, Elem } from "../../utils/bem";

import { ModelVersionSelector } from "./AnnotationSettings/ModelVersionSelector";
import { ProjectContext } from "../../providers/ProjectProvider";
import { Divider } from "../../components/Divider/Divider";

export const AnnotationSettings = () => {
  const { project, fetchProject } = useContext(ProjectContext);
  const pageContext = useContext(MenubarContext);
  const formRef = useRef();
  const [collab, setCollab] = useState(null);

  useEffect(() => {
    pageContext.setProps({ formRef });
  }, [formRef]);

  const updateProject = useCallback(() => {
    fetchProject(project.id, true);
  }, [project]);

  return (
    <Block name="annotation-settings">
      <Elem name={"wrapper"}>
        <h1>标注设置</h1>
        <Block name="settings-wrapper">
          <Form
            ref={formRef}
            action="updateProject"
            formData={{ ...project }}
            params={{ pk: project.id }}
            onSubmit={updateProject}
          >
            <Form.Row columnCount={1}>
              <Elem name={"header"}>标注规则</Elem>
              <div style={{ color: "var(--sand_600)", fontSize: "14px" }}>
{/*                 <p style={{ marginBottom: "0" }}>Write instructions to help users complete labeling tasks.</p> */}
                <p style={{ marginTop: "8px" }}>
                  标注规则支持HTML和markup格式，且支持嵌入图片、PDF文档等，清晰的标注规则使标注人员更容易展开工作。
                </p>
              </div>
              <TextArea name="expert_instruction" style={{ minHeight: 128, maxWidth: "520px" }} />
               <div>
                <Toggle label="是否在标注之前进行展示" name="show_instruction" />
              </div>
            </Form.Row>

            <Divider height={32} />

            <Form.Row columnCount={1}>
              <br />
              <Elem name={"header"}>模型预标注</Elem>
              <div>
                <Toggle
                  label="使用模型进行预标注"
//                   description={<span>使用模型进行预标注可以减轻标注人员工作量</span>}
                  name="show_collab_predictions"
                  onChange={(e) => {
                    setCollab(e.target.checked);
                  }}
                />
              </div>

              {(collab !== null ? collab : project.show_collab_predictions) && <ModelVersionSelector />}
            </Form.Row>

            <Form.Actions>
              <Form.Indicator>
                <span case="success">保存成功</span>
              </Form.Indicator>
              <Button type="submit" look="primary" style={{ width: 120 }}>
                保存
              </Button>
            </Form.Actions>
          </Form>
        </Block>
      </Elem>
    </Block>
  );
};

AnnotationSettings.title = "标注";
AnnotationSettings.path = "/annotation";
