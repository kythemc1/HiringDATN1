import type { AuditedEntityDto, EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { SkillLevel } from './skill-level.enum';
import type { CoverLetterTone } from './cover-letter-tone.enum';
import type { ApplicationStatus } from './application-status.enum';

export interface AgentThinkingLogDto extends AuditedEntityDto<number> {
  messageId: number;
  agentName?: string;
  stepName?: string;
  inputData?: string;
  outputData?: string;
  durationMs: number;
}

export interface AiModelConfigDto extends AuditedEntityDto<number> {
  providerName?: string;
  modelName?: string;
  apiKey?: string;
  baseUrl?: string;
  isActive?: boolean;
}

export interface AiPromptTemplateDto extends AuditedEntityDto<number> {
  code?: string;
  templateContent?: string;
  description?: string;
  modelConfigId?: string;
  temperature?: number;
}

export interface CVDto {
  candidateProfileDto: CandidateProfileDto;
  candidateCertificateDtos: CandidateCertificateDto[];
  candidateEducationDtos: CandidateEducationDto[];
  candidateExperienceDtos: CandidateExperienceDto[];
  candidateSkillDtos: CandidateSkillDto[];
  candidateProjectDtos: CandidateProjectDto[];
}

export interface CandidateCertificateDto extends AuditedEntityDto<number> {
  profileId: number;
  name?: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface CandidateEducationDto extends AuditedEntityDto<number> {
  profileId: number;
  schoolName?: string;
  degree?: string;
  major?: string;
  startDate?: string;
  endDate?: string;
  gpa?: number;
  description?: string;
}

export interface CandidateExperienceDto extends AuditedEntityDto<number> {
  profileId: number;
  companyName?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

export interface CandidateProfileDto extends AuditedEntityDto<number> {
  userId: number;
  fullName?: string;
  jobTitle?: string;
  aboutMe?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  githubUrl?: string;
  linkedInUrl?: string;
}

export interface CandidateProjectDto extends AuditedEntityDto<number> {
  profileId: number;
  name?: string;
  linkUrl?: string;
  description?: string;
  technologies?: string;
  teamSize: number;
  role?: string;
}

export interface CandidateSkillDto extends AuditedEntityDto<number> {
  profileId: number;
  skillDefinitionId: number;
  level?: SkillLevel;
}

export interface CertificateDefinitionDto extends AuditedEntityDto<number> {
  name?: string;
  issuer?: string;
}

export interface ChatMessageDto extends AuditedEntityDto<number> {
  sessionId: number;
  role?: string;
  content?: string;
}

export interface ChatSessionDto extends AuditedEntityDto<number> {
  userId: number;
  title?: string;
  sessionType?: string;
}

export interface CompanyDto extends AuditedEntityDto<number> {
  name?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  address?: string;
}

export interface CoverLetterGenerationInputDto {
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;
  cvContent: string;
  targetCompanyName: string;
  targetJobTitle: string;
  jobDescription: string;
  language?: string;
  tone?: CoverLetterTone;
}

export interface CreateUpdateAgentThinkingLogDto extends AuditedEntityDto<number> {
  messageId: number;
  agentName?: string;
  stepName?: string;
  inputData?: string;
  outputData?: string;
  durationMs: number;
}

export interface CreateUpdateAiModelConfigDto extends AuditedEntityDto<number> {
  providerName?: string;
  modelName?: string;
  apiKey?: string;
  baseUrl?: string;
  isActive?: boolean;
}

export interface CreateUpdateAiPromptTemplateDto extends AuditedEntityDto<number> {
  code?: string;
  templateContent?: string;
  description?: string;
  modelConfigId?: string;
  temperature?: number;
}

export interface CreateUpdateCVDto {
  createUpdateCandidateProfileDto: CreateUpdateCandidateProfileDto;
  createUpdateCandidateCertificateDtos: CreateUpdateCandidateCertificateDto[];
  createUpdateCandidateEducationDtos: CreateUpdateCandidateEducationDto[];
  createUpdateCandidateExperienceDtos: CreateUpdateCandidateExperienceDto[];
  createUpdateCandidateSkillDtos: CreateUpdateCandidateSkillDto[];
  createUpdateCandidateProjectDtos: CreateUpdateCandidateProjectDto[];
}

export interface CreateUpdateCandidateCertificateDto extends EntityDto<number> {
  profileId: number;
  name?: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface CreateUpdateCandidateEducationDto extends EntityDto<number> {
  profileId: number;
  schoolName?: string;
  degree?: string;
  major?: string;
  startDate?: string;
  endDate?: string;
  gpa?: number;
  description?: string;
}

export interface CreateUpdateCandidateExperienceDto extends EntityDto<number> {
  profileId: number;
  companyName?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

export interface CreateUpdateCandidateProfileDto extends EntityDto<number> {
  userId: number;
  fullName?: string;
  jobTitle?: string;
  aboutMe?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  githubUrl?: string;
  linkedInUrl?: string;
}

export interface CreateUpdateCandidateProjectDto extends EntityDto<number> {
  profileId: number;
  name?: string;
  linkUrl?: string;
  description?: string;
  technologies?: string;
  teamSize: number;
  role?: string;
}

export interface CreateUpdateCandidateSkillDto extends EntityDto<number> {
  profileId: number;
  skillDefinitionId: number;
  level?: SkillLevel;
}

export interface CreateUpdateCertificateDefinitionDto extends AuditedEntityDto<number> {
  name?: string;
  issuer?: string;
}

export interface CreateUpdateChatMessageDto extends AuditedEntityDto<number> {
  sessionId: number;
  role?: string;
  content?: string;
}

export interface CreateUpdateChatSessionDto extends AuditedEntityDto<number> {
  userId: number;
  title?: string;
  sessionType?: string;
}

export interface CreateUpdateCompanyDto extends EntityDto<number> {
  name?: string;
  description?: string;
  website?: string;
  logoUrl?: string;
  address?: string;
}

export interface CreateUpdateJobApplicationDto extends EntityDto<number> {
  jobId: number;
  candidateProfileId: number;
  profileSnapshotJson?: string;
  coverLetter?: string;
  status?: ApplicationStatus;
  aiMatchingScore?: number;
}

export interface CreateUpdateJobPositionDto extends AuditedEntityDto<number> {
  name?: string;
  alias?: string;
}

export interface CreateUpdateSkillDefinitionDto extends AuditedEntityDto<number> {
  name?: string;
  category?: string;
  description?: string;
}

export interface CreateUpdateUniversityDto extends AuditedEntityDto<number> {
  name?: string;
  code?: string;
  country?: string;
}

export interface CreateUpdateUserFeedbackDto extends AuditedEntityDto<number> {
  messageId: number;
  rating: number;
  comment?: string;
  isHelpful: boolean;
}

export interface GenerateObjectiveInputDto {
  currentRole?: string;
  targetCompanyName?: string;
  targetJobTitle?: string;
  yearsOfExperience: number;
}

export interface JobApplicationDto extends AuditedEntityDto<number> {
  jobId: number;
  candidateProfileId: number;
  profileSnapshotJson?: string;
  coverLetter?: string;
  status?: ApplicationStatus;
  aiMatchingScore?: number;
}

export interface JobPositionDto extends AuditedEntityDto<number> {
  name?: string;
  alias?: string;
}

export interface OptimizeWorkExperienceInputDto {
  jobTitle?: string;
  companyName?: string;
  rawDescription?: string;
}

export interface SearchInputDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface SkillDefinitionDto extends AuditedEntityDto<number> {
  name?: string;
  category?: string;
  description?: string;
}

export interface UniversityDto extends AuditedEntityDto<number> {
  name?: string;
  code?: string;
  country?: string;
}

export interface UserFeedbackDto extends AuditedEntityDto<number> {
  messageId: number;
  rating: number;
  comment?: string;
  isHelpful: boolean;
}
