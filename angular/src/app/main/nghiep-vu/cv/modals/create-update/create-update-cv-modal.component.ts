import {
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CVService } from '../../../../../proxy/controllers/cv.service';
import {
  CVDto,
  CreateUpdateCVDto,
  CandidateCertificateDto,
  CandidateEducationDto,
  CandidateExperienceDto,
  CandidateProfileDto,
  CandidateProjectDto,
  CandidateSkillDto,
} from '../../../../../proxy/dtos/models';
import { Dialog } from 'primeng/dialog';
import { ConfigStateService } from '@abp/ng.core';
import { EMPTY, catchError, finalize, map, of, switchMap, takeWhile, tap, timer } from 'rxjs';
import { AppBaseComponent } from 'src/app/shared/components/base-component/base-component';
import { CvContentAppService } from 'src/app/proxy/controllers/cv-content-app.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  standalone: false,
  selector: 'app-create-update-cv-modal',
  templateUrl: './create-update-cv-modal.component.html',
  styleUrls: ['./create-update-cv-modal.component.less'],
})
export class CreateUpdateCvModalComponent
  extends AppBaseComponent
  implements OnInit, OnDestroy {
  //#region Variables
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @ViewChild(Dialog, { static: false }) private modal: Dialog;
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('firstElm', { static: false }) firstElm: ElementRef;
  @Input() inline = false;
  @Input() readOnly = false;
  isModalOpen = false;
  @Input() modalTitle: string;
  @Input() updateCvDto: CVDto;

  form: FormGroup;

  //#endregion

  //#region Constructor and Lifecycle
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private CvService: CVService,
    private cvContentAppService: CvContentAppService,
    private location: Location,
    private configState: ConfigStateService,
  ) {
    super(injector);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('updateCvDto' in changes && this.inline) {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
  //#endregion

  //#region Custom methods
  show(): void {
    if (this.inline) return;
    this.isModalOpen = true;
    setTimeout(() => this.firstElm.nativeElement.focus(), 300);
  }

  buildForm(): void {
    const profile = this.updateCvDto?.candidateProfileDto ?? ({} as CandidateProfileDto);
    const currentUser: any = this.configState.getOne('currentUser') ?? {};
    const resolvedUserId = profile?.userId ?? currentUser?.id ?? currentUser?.userId ?? null;
    // resolvedUserId = 1;
    const userId =1;
    this.form = this.fb.group({
      createUpdateCandidateProfileDto: this.fb.group({
        id: [profile?.id ?? null],
        userId: [userId],
        fullName: [profile?.fullName ?? ''],
        jobTitle: [profile?.jobTitle ?? ''],
        aboutMe: [profile?.aboutMe ?? ''],
        dateOfBirth: [profile?.dateOfBirth ?? null],
        phoneNumber: [profile?.phoneNumber ?? ''],
        email: [profile?.email ?? ''],
        address: [profile?.address ?? ''],
        githubUrl: [profile?.githubUrl ?? ''],
        linkedInUrl: [profile?.linkedInUrl ?? ''],
        targetCompanyName: [ ''],
        targetJobTitle: [ ''],
        yearsOfExperience: [0],
        
      }),
      createUpdateCandidateCertificateDtos: this.fb.array(
        this.mapToCertificateGroups(this.updateCvDto?.candidateCertificateDtos)
      ),
      createUpdateCandidateEducationDtos: this.fb.array(
        this.mapToEducationGroups(this.updateCvDto?.candidateEducationDtos)
      ),
      createUpdateCandidateExperienceDtos: this.fb.array(
        this.mapToExperienceGroups(this.updateCvDto?.candidateExperienceDtos)
      ),
      createUpdateCandidateSkillDtos: this.fb.array(
        this.mapToSkillGroups(this.updateCvDto?.candidateSkillDtos)
      ),
      createUpdateCandidateProjectDtos: this.fb.array(
        this.mapToProjectGroups(this.updateCvDto?.candidateProjectDtos)
      ),
    });

    // ⚙️ Nếu là read-only thì disable toàn form và return sớm
    if (this.readOnly) {
      this.form.disable();
      return;
    }

  }

  get candidateCertificateForms(): FormArray {
    return this.form.get('createUpdateCandidateCertificateDtos') as FormArray;
  }

  get candidateEducationForms(): FormArray {
    return this.form.get('createUpdateCandidateEducationDtos') as FormArray;
  }

  get candidateExperienceForms(): FormArray {
    return this.form.get('createUpdateCandidateExperienceDtos') as FormArray;
  }

  get candidateSkillForms(): FormArray {
    return this.form.get('createUpdateCandidateSkillDtos') as FormArray;
  }

  get candidateProjectForms(): FormArray {
    return this.form.get('createUpdateCandidateProjectDtos') as FormArray;
  }

  addCertificate(): void {
    this.candidateCertificateForms.push(this.createCertificateFormGroup());
  }

  removeCertificate(index: number): void {
    this.candidateCertificateForms.removeAt(index);
  }

  addEducation(): void {
    this.candidateEducationForms.push(this.createEducationFormGroup());
  }

  removeEducation(index: number): void {
    this.candidateEducationForms.removeAt(index);
  }

  addExperience(): void {
    this.candidateExperienceForms.push(this.createExperienceFormGroup());
  }

  removeExperience(index: number): void {
    this.candidateExperienceForms.removeAt(index);
  }

  addSkill(): void {
    this.candidateSkillForms.push(this.createSkillFormGroup());
  }

  removeSkill(index: number): void {
    this.candidateSkillForms.removeAt(index);
  }

  addProject(): void {
    this.candidateProjectForms.push(this.createProjectFormGroup());
  }

  removeProject(index: number): void {
    this.candidateProjectForms.removeAt(index);
  }

  //#endregion


  //#region Main methods
  save(): void {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }
    const formValue = this.form.value as CreateUpdateCVDto;
    const request = this.CvService.create(formValue);
    this.showLoading();
    request
      .pipe(
        takeWhile(() => this.componentActive),
        tap(() => {
          const isEdit = !!formValue.createUpdateCandidateProfileDto?.id;
          this.showSuccessMessage("Lưu dữ liệu thành công");
          this.isModalOpen = false;
          try { this.saved.emit(true); } catch { }
        }),
        catchError((err) => {
          // Lấy đúng message từ API trả về
          
          this.showErrorMessage("Đã xảy ra lỗi khi lưu dữ liệu");
          return EMPTY;
        }),
        finalize(() => {
          this.hideLoading();
        })
      )
      .subscribe();
  }

  saveAndNew(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value as CreateUpdateCVDto;

    const isUpdate = !!formValue.createUpdateCandidateProfileDto?.id;
    const request = this.CvService.create(formValue);

    this.showLoading();

    request
      .pipe(
        takeWhile(() => this.componentActive),
        tap(() => {
          const message = isUpdate
            ? "Cập nhật dữ liệu thành công"
            : "Thêm mới dữ liệu thành công";
          this.message.add({
            severity: 'info',
            summary: "Thông báo",
            detail: message,
            key: 'global',
            life: 3000,
          });
          try { this.saved.emit(false); } catch { }
          // Reset form and DTO for new entry
          this.updateCvDto = {} as CVDto;
          this.form.reset();
          this.buildForm(); // Rebuild to apply default validators/state

          setTimeout(() => {
            this.firstElm.nativeElement.focus();
          });
        }),
        finalize(() => {
          this.hideLoading();
        })
      )
      .subscribe();
  }

  close(): void {
    if (this.inline) {
      this.canceled.emit();
      this.form?.reset();
      return;
    }
    this.isModalOpen = false;
    this.form?.reset();
    this.location.back();
  }
  //#endregion

  //#region Private methods
  private mapToCertificateGroups(items?: CandidateCertificateDto[]): FormGroup[] {
    return (items || []).map((item) => this.createCertificateFormGroup(item));
  }

  private mapToEducationGroups(items?: CandidateEducationDto[]): FormGroup[] {
    return (items || []).map((item) => this.createEducationFormGroup(item));
  }

  private mapToExperienceGroups(items?: CandidateExperienceDto[]): FormGroup[] {
    return (items || []).map((item) => this.createExperienceFormGroup(item));
  }

  private mapToSkillGroups(items?: CandidateSkillDto[]): FormGroup[] {
    return (items || []).map((item) => this.createSkillFormGroup(item));
  }

  private mapToProjectGroups(items?: CandidateProjectDto[]): FormGroup[] {
    return (items || []).map((item) => this.createProjectFormGroup(item));
  }

  private createCertificateFormGroup(item?: CandidateCertificateDto): FormGroup {
    return this.fb.group({
      id: [item?.id ?? null],
      profileId: [item?.profileId ?? this.getProfileId()],
      name: [item?.name ?? ''],
      issuer: [item?.issuer ?? ''],
      issueDate: [item?.issueDate ?? null],
      expiryDate: [item?.expiryDate ?? null],
      credentialUrl: [item?.credentialUrl ?? ''],
    });
  }

  private createEducationFormGroup(item?: CandidateEducationDto): FormGroup {
    return this.fb.group({
      id: [item?.id ?? null],
      profileId: [item?.profileId ?? this.getProfileId()],
      schoolName: [item?.schoolName ?? ''],
      degree: [item?.degree ?? ''],
      major: [item?.major ?? ''],
      startDate: [item?.startDate ?? null],
      endDate: [item?.endDate ?? null],
      gpa: [item?.gpa ?? null],
      description: [item?.description ?? ''],
    });
  }

  private createExperienceFormGroup(item?: CandidateExperienceDto): FormGroup {
    return this.fb.group({
      id: [item?.id ?? null],
      profileId: [item?.profileId ?? this.getProfileId()],
      companyName: [item?.companyName ?? ''],
      position: [item?.position ?? ''],
      startDate: [item?.startDate ?? null],
      endDate: [item?.endDate ?? null],
      isCurrent: [item?.isCurrent ?? false],
      description: [item?.description ?? ''],
    });
  }

  private createSkillFormGroup(item?: CandidateSkillDto): FormGroup {
    return this.fb.group({
      id: [item?.id ?? null],
      profileId: [item?.profileId ?? this.getProfileId()],
      skillDefinitionId: [item?.skillDefinitionId ?? null],
      level: [item?.level ?? null],
    });
  }

  private createProjectFormGroup(item?: CandidateProjectDto): FormGroup {
    return this.fb.group({
      id: [item?.id ?? null],
      profileId: [item?.profileId ?? this.getProfileId()],
      name: [item?.name ?? ''],
      linkUrl: [item?.linkUrl ?? ''],
      description: [item?.description ?? ''],
      technologies: [item?.technologies ?? ''],
      teamSize: [item?.teamSize ?? 0],
      role: [item?.role ?? ''],
    });
  }

  private getProfileId(): number | null {
    return this.updateCvDto?.candidateProfileDto?.id ?? null;
  }

  //#endregion

  
  //# region generate content
  onGenerateCareerObjective(): void {
    // 1. Lấy giá trị từ form group profile
    const profileForm = this.form.get('createUpdateCandidateProfileDto');
    
    if (!profileForm) return;
  
    const rawValue = profileForm.value;
  
    this.cvContentAppService.generateCareerObjective({
      currentRole: rawValue.jobTitle,
      targetCompanyName: 'áp dụng chung cho tất cả công ty',
      targetJobTitle: 'áp dụng chung cho tất cả vị trí tuyển dụng',
      yearsOfExperience: rawValue.yearsOfExperience,
    }).subscribe({
      next: (res: string) => {
        if (res) {
          profileForm.patchValue({
            aboutMe: res
          });
          
        }
      },
      error: (err) => {
        console.error('Lỗi khi generate:', err);
      }
    });
  }
  onOptimizeWorkExperience(index: number): void {
    const experienceForm = this.candidateExperienceForms.at(index);

    if (!experienceForm) return;

    const rawDescription = experienceForm.get('description')?.value;

    this.cvContentAppService
      .optimizeWorkExperience({
        jobTitle: experienceForm.get('position')?.value,
        companyName: experienceForm.get('companyName')?.value,
        rawDescription: rawDescription,
      })
      .subscribe({
        next: (res: string) => {
          if (res) {
            experienceForm.patchValue({
              description: res,
            });
          }
        },
        error: (err) => {
          console.error('Lỗi khi tối ưu kinh nghiệm:', err);
        },
      });
  }

  async exportToPDF() {
    const data = document.getElementById('cvPreview');
    if (!data) return;
  
    this.showLoading();
  
    try {
      // 1. Chụp ảnh với cấu hình an toàn nhất
      const canvas = await html2canvas(data, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 0, // Đợi tải ảnh vô thời hạn
        onclone: (clonedDoc) => {
          // Đảm bảo element hiển thị khi chụp (đôi khi element ẩn gây lỗi)
          const el = clonedDoc.getElementById('cvPreview');
          if (el) el.style.display = 'block';
        }
      });
  
      // 2. Kiểm tra canvas có hợp lệ không
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas render failed: Width or height is 0");
      }
  
      // 3. Lấy dữ liệu ảnh và kiểm tra chuỗi Base64
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Kiểm tra nếu chuỗi không bắt đầu bằng data:image/jpeg
      if (!imgData.startsWith('data:image/jpeg')) {
         throw new Error("Invalid Image Format");
      }
  
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });
  
      // 4. Lấy thông tin ảnh từ jsPDF để chắc chắn không bị 'UNKNOWN'
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      // 5. Thêm ảnh với định dạng JPEG tường minh
      pdf.addImage(
        imgData, 
        'JPEG', 
        0, 
        0, 
        pdfWidth, 
        imgHeight, 
        undefined, 
        'FAST'
      );
  
      // 6. Xử lý ngắt trang
      const pageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = imgHeight - pageHeight;
      let position = -pageHeight;
  
      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
        position -= pageHeight;
      }
  
      const fullName = this.form.get('createUpdateCandidateProfileDto.fullName')?.value || 'Candidate';
      pdf.save(`CV_${fullName.trim().replace(/\s+/g, '_')}.pdf`);
  
      this.showSuccessMessage("Xuất PDF thành công!");
    } catch (error) {
      console.error('Lỗi chi tiết:', error);
      this.showErrorMessage("Lỗi: " + (error.message || "Không thể tạo PDF"));
    } finally {
      this.hideLoading();
    }
  }
  //# endregion
}
