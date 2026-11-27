import { uaeTaxFreeIncomePlanning } from './uae-tax-free-income-planning'
import { uaeHousingFurnished } from './uae-housing-furnished'
import { studentDiscounts } from './student-discounts'
import { studentBudget } from './student-budget'
import { makingFriends } from './making-friends'
import { hiddenCosts } from './hidden-costs'
import { germanyMonthlyBudgeting } from './germany-monthly-budgeting'
import { costOfLiving } from './cost-of-living'
import { accommodationCosts } from './accommodation-costs'
import { airportToHome } from './airport-to-home'
import { afterRentalScam } from './after-rental-scam'
import { avoidScams } from './avoid-scams'
import { chooseAccommodation } from './choose-accommodation'
import { firstWeek } from './first-week'
import { germanyStudentenwerkHousing } from './germany-studentenwerk-housing'
import { germanyTenancyLawDeposits } from './germany-tenancy-law-deposits'
import { hallsVsPrivate } from './halls-vs-private'
import { healthcare } from './healthcare'
import type { ReviewedGuide } from './model'
import { packingList } from './packing-list'
import { preArrivalChecklist } from './pre-arrival-checklist'
import { realCostAbroad } from './real-cost-abroad'
import { studentVisa } from './student-visa'
import { tenancyAgreement } from './tenancy-agreement'
import { ukBankAccount } from './uk-bank-account'
import { uaeVisaSponsorship } from './uae-visa-sponsorship'
import { weightedHousingComparison } from './weighted-housing-comparison'

export const reviewedGuides: ReviewedGuide[] = [
  preArrivalChecklist, chooseAccommodation, realCostAbroad, studentVisa, tenancyAgreement, avoidScams, firstWeek, healthcare, accommodationCosts, airportToHome,
  germanyStudentenwerkHousing, germanyTenancyLawDeposits, uaeVisaSponsorship, hallsVsPrivate, ukBankAccount, packingList,
  costOfLiving, germanyMonthlyBudgeting, hiddenCosts, makingFriends, studentBudget, studentDiscounts,
  uaeHousingFurnished, uaeTaxFreeIncomePlanning,
]

export { afterRentalScam, weightedHousingComparison }
