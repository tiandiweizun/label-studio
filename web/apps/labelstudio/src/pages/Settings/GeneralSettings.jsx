import React, { useCallback, useContext } from "react";
import { Button } from "../../components";
import { Form, Input, Label, Select, TextArea } from "../../components/Form";
import { RadioGroup } from "../../components/Form/Elements/RadioGroup/RadioGroup";
import { ProjectContext } from "../../providers/ProjectProvider";
import { Block, cn, Elem } from "../../utils/bem";
import { EnterpriseBadge } from "../../components/Badges/Enterprise";
import "./settings.scss";
import { HeidiTips } from "../../components/HeidiTips/HeidiTips";
import { FF_LSDV_E_297, isFF } from "../../utils/feature-flags";
import { createURL } from "../../components/HeidiTips/utils";
import { Caption } from "../../components/Caption/Caption";

export const GeneralSettings = () => {
  const { project, fetchProject } = useContext(ProjectContext);

  const updateProject = useCallback(() => {
    if (project.id) fetchProject(project.id, true);
  }, [project]);

  const colors = ["#FDFDFC", "#FF4C25", "#FF750F", "#ECB800", "#9AC422", "#34988D", "#617ADA", "#CC6FBE"];

  const samplings = [
    { value: "Sequential", label: "顺序", description: "按照数据导入顺序" },
    { value: "Uniform", label: "随机", description: "随机选择一个数据" },
  ];

  return (
    <Block name="general-settings">
      <Elem name={"wrapper"}>
        <h1>通用设置</h1>
        <Block name="settings-wrapper">
          <Form action="updateProject" formData={{ ...project }} params={{ pk: project.id }} onSubmit={updateProject}>
            <Form.Row columnCount={1} rowGap="16px">
              <Input name="title" label="项目名称" />

              <TextArea name="description" label="详细描述" style={{ minHeight: 128 }} />
{/*               {isFF(FF_LSDV_E_297) && ( */}
{/*                 <Block name="workspace-placeholder"> */}
{/*                   <Elem name="badge-wrapper"> */}
{/*                     <Elem name="title">工作目录</Elem> */}
{/*                     <EnterpriseBadge /> */}
{/*                   </Elem> */}
{/*                   <Select placeholder="Select an option" disabled options={[]} /> */}
{/*                   <Caption> */}
{/*                     Simplify project management by organizing projects into workspaces.{" "} */}
{/*                     <a */}
{/*                       target="_blank" */}
{/*                       href={createURL( */}
{/*                         "https://docs.humansignal.com/guide/manage_projects#Create-workspaces-to-organize-projects", */}
{/*                         { */}
{/*                           experiment: "project_settings_tip", */}
{/*                           treatment: "simplify_project_management", */}
{/*                         }, */}
{/*                       )} */}
{/*                       rel="noreferrer" */}
{/*                     > */}
{/*                       Learn more */}
{/*                     </a> */}
{/*                   </Caption> */}
{/*                 </Block> */}
{/*               )} */}
              <RadioGroup name="color" label="颜色" size="large" labelProps={{ size: "large" }}>
                {colors.map((color) => (
                  <RadioGroup.Button key={color} value={color}>
                    <Block name="color" style={{ "--background": color }} />
                  </RadioGroup.Button>
                ))}
              </RadioGroup>

              <RadioGroup label="采样方式" labelProps={{ size: "large" }} name="采样" simple>
                {samplings.map(({ value, label, description }) => (
                  <RadioGroup.Button
                    key={value}
                    value={`${value}采样`}
                    label={`${label}采样`}
                    description={description}
                  />
                ))}
{/*                 {isFF(FF_LSDV_E_297) && ( */}
{/*                   <RadioGroup.Button */}
{/*                     key="uncertainty-sampling" */}
{/*                     value="" */}
{/*                     label={ */}
{/*                       <> */}
{/*                         Uncertainty sampling <EnterpriseBadge /> */}
{/*                       </> */}
{/*                     } */}
{/*                     disabled */}
{/*                     description={ */}
{/*                       <> */}
{/*                         Tasks are chosen according to model uncertainty score (active learning mode).{" "} */}
{/*                         <a */}
{/*                           target="_blank" */}
{/*                           href={createURL("https://docs.humansignal.com/guide/active_learning", { */}
{/*                             experiment: "project_settings_workspace", */}
{/*                             treatment: "workspaces", */}
{/*                           })} */}
{/*                           rel="noreferrer" */}
{/*                         > */}
{/*                           Learn more */}
{/*                         </a> */}
{/*                       </> */}
{/*                     } */}
{/*                   /> */}
{/*                 )} */}
              </RadioGroup>
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
      {isFF(FF_LSDV_E_297) && <HeidiTips collection="projectSettings" />}
    </Block>
  );
};

GeneralSettings.menuItem = "通用";
GeneralSettings.path = "/";
GeneralSettings.exact = true;
