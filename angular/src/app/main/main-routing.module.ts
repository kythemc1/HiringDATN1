
import { permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      //#region 0. Root
      
      // Danh mục chung
      {
        path: 'danh-muc-chung',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'chuc-vu',
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/ai-model-config/ai-model-config.module').then(m => m.AIModelConfigModule),
          },
        

        ],
      },
      //#endregion
      //#region QuanLyNghiepVu
      {
        path: 'quan-ly-nghiep-vu',
        children: [

        ],
      },
      //#endregion
      //#region QuanTriHeThong
      {
        path: 'quan-tri-he-thong',
        children: [

          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'system-user',
          },
        
        ],
        // loadChildren: () => import('./quan-tri-he-thong/quan-tri-he-thong.module').then(m => m.QuanTriHeThongModule),
      },

      //#endregion
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
