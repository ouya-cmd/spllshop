<template>
  <!--   大盒子 -->
  <div id="category" class="ok">
    <!-- 導航欄 -->
     <nav-bar class="category-bar">
      <div slot="center">分类</div>
    </nav-bar>
    <!-- 中盒子 -->
    <div class="content">
      <!-- 中盒子裡面左邊 -->
      <div class="content-left">
        <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      </div>
      <!-- 中盒子裡面右邊 -->
      <div class="content-right">
        <scroll id="tab-content" ref="category" >
          <div>
            <tab-content-category
              :subcategories="showSubcategory"
            ></tab-content-category>
            <tab-control
              :titles="['综合', '新品', '销量']"
              @itemClick="tabClick"
            ></tab-control>
            <tab-content-detail
              :category-detail="showCategoryDetail"
            ></tab-content-detail>
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
// 子组件
import TabMenu from "./childComps/TabMenu.vue";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";
// axios數據
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import { POP, SELL, NEW } from "@/common/const";
import { tabControlMixin } from "@/common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail,
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    },
  },
};
</script>
<style scoped>
.category-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100vh - 49px - 44px);
  width: 100%;
  display: flex;
}
.content-right {
  flex: 1;
  box-sizing: border-box;
  background-color: #fff;
}
#tab-content {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>