/**
 * 花火数据强制约束接口
 * 技术层面确保数据准确性，防止胡编乱造
 */

export interface OfficialSourceConstraint {
 walkerPlusUrl: string; // 必须是Walker Plus官方链接
 verificationDate: string; // 验证日期
 dataConfirmedBy: 'USER_PROVIDED'; // 只能是用户提供
 lastChecked: string; // 最后检查时间
}

export interface HanabiDataWithConstraints {
 id: string;
 name: string;
 japaneseName: string; // 强制要求日文原名
 date: string;
 location: string;
 
 // 强制要求官方来源验证
 officialSource: OfficialSourceConstraint;
 
 // 可选字段
 visitors?: string;
 fireworks?: string;
 likes?: number;
 
 // 技术验证标记
 dataIntegrityCheck: {
 hasOfficialSource: boolean;
 userVerified: boolean;
 lastValidated: string;
 };
}

/**
 * 数据创建约束 - 技术上强制要求
 */
export class HanabiDataValidator {
 static validateOfficialSource(source: OfficialSourceConstraint): boolean {
 // 技术验证：必须是Walker Plus域名
 if (!source.walkerPlusUrl.includes('hanabi.walkerplus.com')) {
 throw new Error('❌ 技术约束：数据源必须来自Walker Plus官方网站');
 }
 
 // 技术验证：必须是用户提供
 if (source.dataConfirmedBy !== 'USER_PROVIDED') {
 throw new Error('❌ 技术约束：数据必须由用户提供，AI不得编造');
 }
 
 return true;
 }
 
 static createHanabiData(
 data: Omit<HanabiDataWithConstraints, 'dataIntegrityCheck'>,
 userProvided: boolean = false
 ): HanabiDataWithConstraints {
 
 if (!userProvided) {
 throw new Error('❌ 技术约束：禁止AI独立创建数据，必须由用户提供');
 }
 
 this.validateOfficialSource(data.officialSource);
 
 return {
 ...data,
 dataIntegrityCheck: {
 hasOfficialSource: true,
 userVerified: userProvided,
 lastValidated: new Date().toISOString()
 }
 };
 }
} 