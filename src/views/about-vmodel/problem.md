# 问题描述：
在vue3框架的项目遇到，通过二次封装el-input的时候，在父组件上使用v-model。然后在父组件中输入，子组件中触发input的事件中修改value的值，并回传
但是，父组件中的显示不会改变为在input中修改的值，同时去除input事件，v-model一样可以双向绑定
# 猜想1：
因为v-model本质上是 :value=“value” 和 @input = “(val)=>{ value = val }” 的语法糖，在父组件上使用 v-model时候，vue检测到后
会在使用子组件的时候，自动把这两者加上去，等同于把自己事先绑定的input事件处理函数覆盖掉了。
# 验证1： 
猜想不成立，在vue2中组件是正常的，那么只可能是vue3框架的问题

# 猜想2：
这种问题只会发生在vue3框架下，原因可能是在项目中，是在模板中对于变量集合对象假设为paramList进行for循环生成的，未能形成响应式对象
# 验证2：
在项目中，设置一个变量 testValue = ref('') 进行实验，反正问题依然，猜想2 不成立

# 猜想3：
这种问题只会发生在vue3框架下，v-model是语法糖，在vue3中v-model的所指代的语法糖不一样了，在vue3中，正常的值绑定使用 :model-value="value"
因为输入变化而值改变的语法为 @update:model-value=" val => { value = val } "
而项目的中的组件是从vue2项目中迁移过来的
# 验证3：
将组件中的触发事件由input改为 update:model-value, 然后组件没有上述问题, 所以猜想3正确

# 相关内容
在vue3中， v-model语法糖知道是 :model-value 和 @update:model-value。在子组件中使用需要在emits中添加元素update:model-value，然后在
子组件的方法中使用$emit触发。el-select的下拉框的下拉选择事情是无法触发input事件的