<style lang="less">
    // @import '../../styles/common.less';
    // @import './configure.less';
</style>
  
<template>
    <div>
        <Row>
            <Col>
                <Form ref="formCustom" :model="formCustom" :rules="formCustom" inline label-position="right" :label-width="100">
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        td_view_arch
                       </p>
                        <div class="appendArch">
                            <FormItem label="page_code" prop="pageCode">
                                <Input type="text" v-model="formCustom.pageCode"></Input>
                                 <ul class="drop-wrap" v-if="isDrop">
                                    <li v-for=" (item, index) in pageCodeArray " @click="choosePage(index)"> {{item.label}}</li>
                                </ul>
                            </FormItem>
                            <FormItem label="arch_code" prop="archCode">
                                <Input type="text" v-model="formCustom.archCode"></Input>
                            </FormItem>
                            <FormItem label="arch_name" prop="archName">
                                <Input type="text" v-model="formCustom.archName"></Input>
                            </FormItem>
                            <FormItem label="state" prop="state">
                                <Input type="text" v-model="formCustom.state"></Input>
                            </FormItem>
                            <FormItem label="staytime_value" prop="staytimeValue">
                                <Input type="text" v-model="formCustom.staytimeValue"></Input>
                            </FormItem>
                            <FormItem label="staytime_unit" prop="staytimeUnit">
                                <Input type="text" v-model="formCustom.staytimeUnit"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleUpdate('formPage')">保存</Button>
                                <!-- <Button type="ghost" @click="handleReset('formPage')" style="margin-left: 8px">重置</Button> -->
                            </FormItem>
                        </div>
                </Card>
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                       td_route_rule
                       </p>
                        <div class="appendArch">
                            <FormItem label="get_value_expr" prop="getValueExpr">
                                <Input type="text" v-model="formCustom.getValueExpr"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleUpdate('formPage')">保存</Button>
                                <!-- <Button type="ghost" @click="handleReset('formPage')" style="margin-left: 8px">重置</Button> -->
                            </FormItem>
                        </div>
                </Card>
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                       td_view_virtual_arch
                       </p>
                        <div class="appendArch">
                            <FormItem label="page_code" prop="pageCode">
                                <Input type="text" v-model="formCustom.pageCode"></Input>
                            </FormItem>
                            <FormItem label="arch_code" prop="archCode">
                                <Input type="text" v-model="formCustom.archCode"></Input>
                            </FormItem>
                            <FormItem label="route_id" prop="routeId">
                                <Input type="text" v-model="formCustom.routeId"></Input>
                            </FormItem>
                            <FormItem label="virtual_arch_code" prop="virtualArchCode">
                                <Input type="text" v-model="formCustom.virtualArchCode"></Input>
                            </FormItem>
                            <FormItem label="virtual_arch_name" prop="virtualArchName">
                                <Input type="text" v-model="formCustom.virtualArchName"></Input>
                            </FormItem>
                            <FormItem label="state" prop="state">
                                <Input type="text" v-model="formCustom.state"></Input>
                            </FormItem>
                            <FormItem label="staytime_value" prop="staytimeValue">
                                <Input type="text" v-model="formCustom.staytimeValue"></Input>
                            </FormItem>
                            <FormItem label="staytime_unit" prop="staytimeUnit">
                                <Input type="text" v-model="formCustom.staytimeUnit"></Input>
                            </FormItem>
                            <FormItem label="default_tag" prop="defaultTag">
                                <Input type="text" v-model="formCustom.defaultTag"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleUpdate('formPage')">保存</Button>
                                <!-- <Button type="ghost" @click="handleReset('formPage')" style="margin-left: 8px">重置</Button> -->
                            </FormItem>
                        </div>
                </Card>
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                       td_view_arch_element 
                       </p>
                        <div class="appendArch">
                            <FormItem label="page_code" prop="pageCode">
                                <Input type="text" v-model="formCustom.pageCode"></Input>
                            </FormItem>
                            <FormItem label="arch_code" prop="archCode">
                                <Input type="text" v-model="formCustom.archCode"></Input>
                            </FormItem>
                            <FormItem label="element_code" prop="elementCode">
                                <Input type="text" v-model="formCustom.elementCode"></Input>
                            </FormItem>
                            <FormItem label="route_id" prop="routeId">
                                <Input type="text" v-model="formCustom.routeId"></Input>
                            </FormItem>
                            <FormItem label="element_url" prop="elementUrl">
                                <Input type="text" v-model="formCustom.elementUrl"></Input>
                            </FormItem>
                            <FormItem label="element_type_code" prop="elementTypeCode">
                                <Input type="text" v-model="formCustom.elementTypeCode"></Input>
                            </FormItem>
                            <FormItem label="element_code_virtual" prop="elementCodeVirtual">
                                <Input type="text" v-model="formCustom.elementCodeVirtual"></Input>
                            </FormItem>
                            <FormItem label="element_state" prop="elementState">
                                <Input type="text" v-model="formCustom.elementState"></Input>
                            </FormItem>
                            <FormItem label="show_order" prop="showOrder">
                                <Input type="text" v-model="formCustom.showOrder"></Input>
                            </FormItem>
                            <FormItem label="default_tag" prop="defaultTag">
                                <Input type="text" v-model="formCustom.defaultTag"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleUpdate('formPage')">保存</Button>
                                <!-- <Button type="ghost" @click="handleReset('formPage')" style="margin-left: 8px">重置</Button> -->
                            </FormItem>
                        </div>
                </Card>
                    <!-- <FormItem>
                        <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                        <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                    </FormItem> -->
                </Form>
            </Col>
        </Row>
    </div>
   
</template>

<script>
    export default {
        data () {
            return {
                formCustom: {
                    pageCode: '',
                    pageName: ''
                },
                ruleCustom: {
                    pageCode: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
                    pageName: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }]
                },
                columns1: [
                    {
                        title: 'greenCode',
                        key: 'greenCode'
                    },
                    {
                        title: 'greenName',
                        key: 'greenName'
                    },
                    {
                        title: 'greenType',
                        key: 'greenType'
                    },
                    {
                        title: 'greenState',
                        key: 'greenState'
                    }
                ]
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style>

</style>
