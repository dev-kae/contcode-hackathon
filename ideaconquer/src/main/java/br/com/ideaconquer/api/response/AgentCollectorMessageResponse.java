package br.com.ideaconquer.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgentCollectorMessageResponse {

    @JsonProperty("initial_context")
    private InitialContext initialContext;

    @JsonProperty("identity_and_purpose")
    private IdentityAndPurpose identityAndPurpose;

    @JsonProperty("target_audience")
    private TargetAudience targetAudience;

    @JsonProperty("products_and_services")
    private ProductsAndServices productsAndServices;

    @JsonProperty("competition_and_market")
    private CompetitionAndMarket competitionAndMarket;

    @JsonProperty("branding_and_positioning")
    private BrandingAndPositioning brandingAndPositioning;

    @JsonProperty("strategies_and_goals")
    private StrategiesAndGoals strategiesAndGoals;

    @JsonProperty("client_adaptation")
    private ClientAdaptation clientAdaptation;

    @JsonProperty("data_collected")
    private boolean dataCollected;

    @JsonProperty("message")
    private String message;

    @Getter
    @Setter
    public static class InitialContext {
        @JsonProperty("company_name_or_idea")
        private String companyNameOrIdea;

        @JsonProperty("business_purpose")
        private String businessPurpose;

        @JsonProperty("target_audience")
        private String targetAudience;

        @JsonProperty("inspiration_or_reference")
        private String inspirationOrReference;
    }
    @Getter
    @Setter
    public static class IdentityAndPurpose {
        @JsonProperty("problem_to_solve")
        private String problemToSolve;

        @JsonProperty("motivation")
        private String motivation;

        @JsonProperty("company_as_person")
        private String companyAsPerson;

        @JsonProperty("impact")
        private String impact;

        @JsonProperty("vision_for_5_years")
        private String visionFor5Years;
    }
    @Getter
    @Setter
    public static class TargetAudience {
        @JsonProperty("beneficiaries")
        private String beneficiaries;

        @JsonProperty("customer_characteristics")
        private String customerCharacteristics;

        @JsonProperty("customer_problem")
        private String customerProblem;

        @JsonProperty("customer_information_sources")
        private String customerInformationSources;
    }
    @Getter
    @Setter
    public static class ProductsAndServices {
        @JsonProperty("offerings")
        private String offerings;

        @JsonProperty("differentiation")
        private String differentiation;

        @JsonProperty("customer_experience")
        private String customerExperience;

        @JsonProperty("pricing")
        private String pricing;
    }
    @Getter
    @Setter
    public static class CompetitionAndMarket {
        @JsonProperty("competitors")
        private String competitors;

        @JsonProperty("competitor_analysis")
        private String competitorAnalysis;

        @JsonProperty("market_position")
        private String marketPosition;
    }
    @Getter
    @Setter
    public static class BrandingAndPositioning {
        @JsonProperty("brand_in_three_words")
        private String brandInThreeWords;

        @JsonProperty("visual_identity")
        private String visualIdentity;

        @JsonProperty("emotions_to_evoke")
        private String emotionsToEvoke;

        @JsonProperty("brand_memory")
        private String brandMemory;
    }
    @Getter
    @Setter
    public static class StrategiesAndGoals {
        @JsonProperty("priorities_for_next_months")
        private String prioritiesForNextMonths;

        @JsonProperty("budget_or_resources")
        private String budgetOrResources;

        @JsonProperty("short_and_long_term_goals")
        private String shortAndLongTermGoals;
    }
    @Getter
    @Setter
    public static class ClientAdaptation {
        @JsonProperty("improvements_or_changes")
        private String improvementsOrChanges;

        @JsonProperty("focus_area")
        private String focusArea;

        @JsonProperty("challenges_and_support")
        private String challengesAndSupport;
    }
}
