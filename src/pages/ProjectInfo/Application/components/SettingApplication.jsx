import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Switch, message, Checkbox, Tooltip, Select } from 'antd';
import {
  QuestionCircleOutlined,
} from '@ant-design/icons';

import { RESTFUL } from '@/constants/applicationServiceTypes';

const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const SettingApplication = (props) => {
  const [form] = Form.useForm();
  const [enableCI, setEnableCI] = useState(false); // 是否开启CI

  const {
    onSubmit,
    onCancel,
    onReload,
    modalVisible,
    applicationInfo,
    filterInfo,
    // values,
  } = props;

  useEffect(() => {
    if (modalVisible) {
      form.setFieldsValue({
        enable_branch_change_notification:
          applicationInfo.enable_branch_change_notification || false,
        enable_ci: applicationInfo.enable_ci || false,
        ci_branch: applicationInfo.enable_ci ? applicationInfo.ci_config?.branch : '',
        ci_action: applicationInfo.enable_ci ? applicationInfo.ci_config?.action[0] : '',
        description: applicationInfo.description || '',
        enable_istio:
          applicationInfo.service_type === RESTFUL
            ? applicationInfo.enable_istio ?? false
            : undefined,
      });
      setEnableCI(applicationInfo.enable_ci || false);
    }
  }, [modalVisible]);

  const update = async () => {
    const { envname } = filterInfo;
    // 验证
    const fieldsValue = await form.validateFields();
    fieldsValue.id = applicationInfo.id;
    fieldsValue.env = {
      [envname]: {
        enable_branch_change_notification: fieldsValue.enable_branch_change_notification || false,
        enable_ci: fieldsValue.enable_ci,
      },
    };
    if (fieldsValue.enable_ci) {
      fieldsValue.env[envname].ci_config = {
        branch: fieldsValue.ci_branch,
        action: [fieldsValue.ci_action]
      }
    }
    try {
      await onSubmit(fieldsValue);
      message.success('保存成功');
      onReload();
    } catch (error) {
      message.error(error.message || '保存失败');
    }
    onCancel();
  };

  // form值更新
  const handleValuesChange = (changedValues) => {
    if (changedValues.hasOwnProperty('enable_ci')) {
      setEnableCI(changedValues.enable_ci);
    }
  };

  const isProd = filterInfo.envname === 'prod' || filterInfo.envname === 'pre';

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title={`编辑应用${applicationInfo.name && ` - ${applicationInfo.name}`}`}
      visible={modalVisible}
      cancelText="取消"
      okText="保存"
      onOk={() => update()}
      onCancel={() => {
        onCancel();
        form.setFieldsValue({
          description: '',
          enable_branch_change_notification: false,
          enable_ci: false,
          ci_branch: '',
          ci_action: ''
        });
      }}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          description: '',
          enable_branch_change_notification: false,
          enable_ci: false,
          ci_branch: '',
          ci_action: ''
        }}
        onValuesChange={(changedValues, allValues) =>
          handleValuesChange(changedValues, allValues)
        }
      >
        <Form.Item label="环境">{filterInfo.envname}</Form.Item>
        {/* <Form.Item
          name="enable_branch_change_notification"
          label="分支变更通知"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item> */}
        <Form.Item
          name="enable_ci"
          label={
            <>
              CI&nbsp;
              <Tooltip title="启用后支持自动构建及发布">
                <QuestionCircleOutlined />
              </Tooltip>
            </>
          }
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        {enableCI && (
          <Form.Item
            label={
              <>
                分支&nbsp;
                <Tooltip title="可支持通配符，例如*-stable、production/*">
                  <QuestionCircleOutlined />
                </Tooltip>
              </>
            }
            required
            name="ci_branch"
            rules={[{ required: true, message: '分支不能为空' }]}
          >
            <Input placeholder="请输入触发CI的分支名" />
          </Form.Item>
        )}
        {enableCI && (
          <Form.Item
            label="动作"
            required
            name="ci_action"
            rules={[{ required: true, message: '动作不能为空' }]}
          >
            <Select
              style={{
                width: '100%',
              }}
            >
              <Option value="buildImage">构建镜像</Option>
              {!isProd && (<Option value="buildImageAndDeploy">构建镜像并部署</Option>)}
            </Select>
          </Form.Item>
        )}
        <Form.Item name="description" label="备注">
          <Input.TextArea rows={4} placeholder="请输入备注" />
        </Form.Item>
        {/* {applicationInfo.service_type === RESTFUL && (
          <Form.Item
            label="启用 Istio"
            name="enable_istio"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        )} */}
      </Form>
    </Modal>
  );
};

export default SettingApplication;
