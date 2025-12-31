
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
            loadChildren: () => import('./danh-muc-chung/ai-model-config/ai-model-config.module').then(m => m.AIModelConfigModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/agent-thinking-log/agent-thinking-log.module').then(m => m.AgentThinkingLogModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/ai-prompt-template/ai-prompt-template.module').then(m => m.AiPromptTemplateModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/candidate-certificate/candidate-certificate.module').then(m => m.CandidateCertificateModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/candidate-project/candidate-project.module').then(m => m.CandidateProjectModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/candidate-profile/candidate-profile.module').then(m => m.CandidateProfileModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/certificate-definition/certificate-definition.module').then(m => m.CertificateDefinitionModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/candidate-skill/candidate-skill.module').then(m => m.CandidateSkillModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/skill-definition/skill-definition.module').then(m => m.SkillDefinitionModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/certificate-definition/certificate-definition.module').then(m => m.CertificateDefinitionModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/company/company.module').then(m => m.CompanyModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/job-position/job-position.module').then(m => m.JobPositionModule),
          },
          {
            path: '',
            loadChildren: () => import('./danh-muc-chung/job-application/job-application.module').then(m => m.JobApplicationModule),
          },
          // {
          //   path: '',
          //   loadChildren: () => import('./danh-muc-chung/university/university.module').then(m => m.UniversityModule),
          // },
        ],
      },
      //#endregion
      //#region QuanLyNghiepVu
      {
        path: 'quan-ly-nghiep-vu',
        children: [
          {
            path: '',
            loadChildren: () => import('./nghiep-vu/cv/cv.module').then(m => m.CvModule),
          },
          {
            path: '',
            loadChildren: () => import('./nghiep-vu/job-posting/job-posting.module').then(m => m.JobPostingModule),
          },
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
