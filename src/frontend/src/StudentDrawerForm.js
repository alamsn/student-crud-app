import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewStudent} from "./client";
import {LoadingOutlined} from "@ant-design/icons";
import {useState} from "react";
import {errorNotification, successNotification} from "./Notification";

const {Option} = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onClose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2))
        addNewStudent(student).then(() => {
            console.log("student added")
            onClose();
            fetchStudents();
            successNotification(
                "Student successfully added",
                `${student.name} was added to the system`
            )
        }).catch(err => {
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`,
                    "bottomLeft"
                )
        });
    }).finally(() => {
        setSubmitting(false);
    })
};

    const onFinishFailed = errorInfo => {
        console.log(JSON.stringify(errorInfo, null, 2));
    }

    return (
        <Drawer
            title={"Create new student"}
            width={500}
            onClose={onClose}
            visible={showDrawer}
            bodyStyle={{paddingBottom: 80}}
            footer={
            <div style={{textAlign: "right"}}>
                <button onClick={onClose} style={{marginRight: 8}}>Cancel</button>
            </div>
            }>

            <Form layout={"vertical"}
                  onFinishFailed={onFinishFailed}
                  onFinish={onFinish}
                  requiredMark="false" >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="name" label="Name" rules={[{required: true, message: 'Please enter student name'}]} >
                            <Input placeholder="Enter student name"/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="email" label="Email" rules={[{required: true, message: 'Please enter student email'}]} >
                            <Input placeholder="Enter student email"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="gender" label="Gender" rules={[{required: true, message: 'Please select student gender'}]} >
                            <Select placeholder='Select student gender'>
                                <Option value="MALE">MALE</Option>
                                <Option value="FEMALE">FEMALE</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    {submitting && <Spin indicator={antIcon} />}
                </Row>

            </Form>
        </Drawer>
    )
}

export default StudentDrawerForm;