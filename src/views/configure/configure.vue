<style lang="less">
    // @import '../../styles/common.less';
    @import './configure.less';
</style>
  
<template>
    <div>
        <Row>
            <Col>
                <Form ref="form" :model="form" :rules="form" inline label-position="right" :label-width="100">
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        td_view_green   
                    </p>
                        <Table :columns="columns1" :data="data1"></Table>
                </Card>
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        {{formPage.type}}
                        <span>编码：{{formPage.keyId}}</span>
                    </p>
                    <Form ref="formPage" :model="formPage" :rules="formPage" inline label-position="right" :label-width="100">
                        <FormItem label="page_code" prop="pageCodes">
                           <Input type="text" v-model="formPage.pageCode"  @on-change="toggleDrop " ></Input>
                            <ul class="drop-wrap" v-if="isDrop">
                                <li v-for=" (item, index) in pageCodeArray " @click="choosePage(index)"> {{item.pageCode}}</li>
                            </ul>
                        </FormItem>
                        <FormItem label="page_name" prop="pageName">
                            <Input type="text" v-model="formPage.pageName"></Input>
                        </FormItem>
                        <FormItem label="page_url" prop="pageUrl">
                            <Input type="text" v-model="formPage.pageUrl"></Input>
                        </FormItem>
                        <FormItem label="page_type" prop="pageType">
                            <Input type="text" v-model="formPage.pageType"></Input>
                        </FormItem>
                        <FormItem label="parent_greenCode" prop="parentGreenCode">
                            <Input type="text" v-model="formPage.parentGreenCode"></Input>
                        </FormItem>
                        <FormItem label="page_state" prop="pageState">
                            <Input type="text" v-model="formPage.pageState"></Input>
                        </FormItem>
                        <FormItem label="staytime_value" prop="staytimeValues">
                            <Input type="text" v-model="formPage.staytimeValues"></Input>
                        </FormItem>
                        <FormItem label="staytime_unit" prop="staytimeUnits">
                            <Input type="text" v-model="formPage.staytimeUnits"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit()">保存</Button>
                            <!-- <Button type="ghost" @click="handleReset('formPage')" style="margin-left: 8px">重置</Button> -->
                        </FormItem>
                    </Form>
                </Card>
                <Card>
                    <p slot="title">
                        <Icon type="android-contact"></Icon>
                        {{formArch.type}}
                        <span>编码：{{formArch.keyId}}</span>
                    </p>
                    <Form ref="formArch" :model="formArch" :rules="formArch" inline label-position="right" :label-width="100">
                        <div class="appendArch">
                            <span type="text" v-model="formArch.type" :value="td_view_arch"></span>
                            <FormItem label="page_code" prop="pageCode">
                                <Input type="text" v-model="formPage.pageCode"></Input>
                                <!-- <ul class="drop-wrap" v-if="isDrop">
                                    <li v-for=" (item, index) in pageCodeArray " @click="choosePage(index)"> {{item.label}}</li>
                                </ul> -->
                            </FormItem>
                            <FormItem label="arch_code" prop="archCode">
                                <Input type="text" v-model="formArch.archCode"   @on-change="toggleDown" ></Input>
                                <ul class="drop-wrap" v-if="isDown">
                                    <li v-for=" (item, index) in archCodeArray " @click="chooseArch(index)"> {{item.archCode}}</li>
                                </ul>
                            </FormItem>
                            <FormItem label="arch_name" prop="archName">
                                <Input type="text" v-model="formArch.archName"></Input>
                            </FormItem>
                            <FormItem label="state" prop="state">
                                <Input type="text" v-model="formArch.state"></Input>
                            </FormItem>
                            <FormItem label="staytime_value" prop="staytimeValue">
                                <Input type="text" v-model="formArch.staytimeValue"></Input>
                            </FormItem>
                            <FormItem label="staytime_unit" prop="staytimeUnit">
                                <Input type="text" v-model="formArch.staytimeUnit"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleUpdate()">保存</Button>
                                <!-- <Button type="ghost" @click="handleReset('formArch')" style="margin-left: 8px">重置</Button> -->
                            </FormItem>
                        </div>
                    </form>
                </Card>
                    <!-- <FormItem>
                        <Button type="primary" @click="handleSubmit('formArch')">提交</Button>
                        <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">重置</Button>
                    </FormItem> -->
                </Form>
            </Col>
        </Row>
    </div>
   
</template>

<script src="@/resource/js/configure.js"></script>



