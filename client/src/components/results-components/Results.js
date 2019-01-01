import React, { Component } from 'react';
import ResultsSummary from './ResultsSummary';
import ResultsBigFive from './ResultsBigFive';
import ResultsNeeds from './ResultsNeeds';
import ResultsValues from './ResultsValues';
import ResultsConsumerPref from './ResultsConsumerPref';

// Material-UI Components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008552',
    },
    secondary: {
      main: '#512DA8',
    }
  },
  typography: { useNextVariants: true },
});

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: {},
      wordCount: null,
      activeTab: "1",
      sourceModal: false,
      resultData : {
        word_count: 103,
        word_count_message: "There were 103 words in the input. We need a minimum of 600, preferably 1,200 or more, to compute statistically significant estimates",
        processed_language: "en",
        personality: [{
            trait_id: "big5_openness",
            name: "Openness",
            category: "personality",
            percentile: 0.25624190662711743,
            significant: true,
            children: [{
                trait_id: "facet_adventurousness",
                name: "Adventurousness",
                category: "personality",
                percentile: 0.14935872634369146,
                significant: true
              },
              {
                trait_id: "facet_artistic_interests",
                name: "Artistic interests",
                category: "personality",
                percentile: 0.9760036692973193,
                significant: true
              },
              {
                trait_id: "facet_emotionality",
                name: "Emotionality",
                category: "personality",
                percentile: 0.713339518794813,
                significant: true
              },
              {
                trait_id: "facet_imagination",
                name: "Imagination",
                category: "personality",
                percentile: 0.8374711597325134,
                significant: true
              },
              {
                trait_id: "facet_intellect",
                name: "Intellect",
                category: "personality",
                percentile: 0.43076434624209914,
                significant: true
              },
              {
                trait_id: "facet_liberalism",
                name: "Authority-challenging",
                category: "personality",
                percentile: 0.9988766737130844,
                significant: true
              }
            ]
          },
          {
            trait_id: "big5_conscientiousness",
            name: "Conscientiousness",
            category: "personality",
            percentile: 0.033912569698390516,
            significant: true,
            children: [{
                trait_id: "facet_achievement_striving",
                name: "Achievement striving",
                category: "personality",
                percentile: 0.008049655160445979,
                significant: true
              },
              {
                trait_id: "facet_cautiousness",
                name: "Cautiousness",
                category: "personality",
                percentile: 0.03817716719911596,
                significant: true
              },
              {
                trait_id: "facet_dutifulness",
                name: "Dutifulness",
                category: "personality",
                percentile: 0.05816091742920543,
                significant: true
              },
              {
                trait_id: "facet_orderliness",
                name: "Orderliness",
                category: "personality",
                percentile: 0.02114472394504413,
                significant: true
              },
              {
                trait_id: "facet_self_discipline",
                name: "Self-discipline",
                category: "personality",
                percentile: 0.0036479369623624858,
                significant: true
              },
              {
                trait_id: "facet_self_efficacy",
                name: "Self-efficacy",
                category: "personality",
                percentile: 0.0008832394912945407,
                significant: true
              }
            ]
          },
          {
            trait_id: "big5_extraversion",
            name: "Extraversion",
            category: "personality",
            percentile: 0.23069072588924056,
            significant: true,
            children: [{
                trait_id: "facet_activity_level",
                name: "Activity level",
                category: "personality",
                percentile: 0.00934131951565026,
                significant: true
              },
              {
                trait_id: "facet_assertiveness",
                name: "Assertiveness",
                category: "personality",
                percentile: 0.000075238918884446,
                significant: true
              },
              {
                trait_id: "facet_cheerfulness",
                name: "Cheerfulness",
                category: "personality",
                percentile: 0.5435414615159205,
                significant: true
              },
              {
                trait_id: "facet_excitement_seeking",
                name: "Excitement-seeking",
                category: "personality",
                percentile: 0.8283168337926541,
                significant: true
              },
              {
                trait_id: "facet_friendliness",
                name: "Outgoing",
                category: "personality",
                percentile: 0.02513600843503383,
                significant: true
              },
              {
                trait_id: "facet_gregariousness",
                name: "Gregariousness",
                category: "personality",
                percentile: 0.13013052323412716,
                significant: true
              }
            ]
          },
          {
            trait_id: "big5_agreeableness",
            name: "Agreeableness",
            category: "personality",
            percentile: 0.6045299991038104,
            significant: true,
            children: [{
                trait_id: "facet_altruism",
                name: "Altruism",
                category: "personality",
                percentile: 0.19348150873600378,
                significant: true
              },
              {
                trait_id: "facet_cooperation",
                name: "Cooperation",
                category: "personality",
                percentile: 0.49225165937183385,
                significant: true
              },
              {
                trait_id: "facet_modesty",
                name: "Modesty",
                category: "personality",
                percentile: 0.9725468796265866,
                significant: true
              },
              {
                trait_id: "facet_morality",
                name: "Uncompromising",
                category: "personality",
                percentile: 0.14549925601067054,
                significant: true
              },
              {
                trait_id: "facet_sympathy",
                name: "Sympathy",
                category: "personality",
                percentile: 0.7300489661937762,
                significant: true
              },
              {
                trait_id: "facet_trust",
                name: "Trust",
                category: "personality",
                percentile: 0.14547628965223736,
                significant: true
              }
            ]
          },
          {
            trait_id: "big5_neuroticism",
            name: "Emotional range",
            category: "personality",
            percentile: 0.03733584736398571,
            significant: true,
            children: [{
                trait_id: "facet_anger",
                name: "Fiery",
                category: "personality",
                percentile: 0.9003806700587629,
                significant: true
              },
              {
                trait_id: "facet_anxiety",
                name: "Prone to worry",
                category: "personality",
                percentile: 0.9941999901714063,
                significant: true
              },
              {
                trait_id: "facet_depression",
                name: "Melancholy",
                category: "personality",
                percentile: 0.9890616879216863,
                significant: true
              },
              {
                trait_id: "facet_immoderation",
                name: "Immoderation",
                category: "personality",
                percentile: 0.7913533483412476,
                significant: true
              },
              {
                trait_id: "facet_self_consciousness",
                name: "Self-consciousness",
                category: "personality",
                percentile: 0.9979594962040426,
                significant: true
              },
              {
                trait_id: "facet_vulnerability",
                name: "Susceptible to stress",
                category: "personality",
                percentile: 0.9994658905238585,
                significant: true
              }
            ]
          }
        ],
        needs: [{
            trait_id: "need_challenge",
            name: "Challenge",
            category: "needs",
            percentile: 0.18877668545859627,
            significant: true
          },
          {
            trait_id: "need_closeness",
            name: "Closeness",
            category: "needs",
            percentile: 0.8430077652843557,
            significant: true
          },
          {
            trait_id: "need_curiosity",
            name: "Curiosity",
            category: "needs",
            percentile: 0.8066085555855366,
            significant: true
          },
          {
            trait_id: "need_excitement",
            name: "Excitement",
            category: "needs",
            percentile: 0.6856963461232457,
            significant: true
          },
          {
            trait_id: "need_harmony",
            name: "Harmony",
            category: "needs",
            percentile: 0.2632759027996267,
            significant: true
          },
          {
            trait_id: "need_ideal",
            name: "Ideal",
            category: "needs",
            percentile: 0.44691084376060153,
            significant: true
          },
          {
            trait_id: "need_liberty",
            name: "Liberty",
            category: "needs",
            percentile: 0.6028576785057618,
            significant: true
          },
          {
            trait_id: "need_love",
            name: "Love",
            category: "needs",
            percentile: 0.41639087631765526,
            significant: true
          },
          {
            trait_id: "need_practicality",
            name: "Practicality",
            category: "needs",
            percentile: 0.16047704870525453,
            significant: true
          },
          {
            trait_id: "need_self_expression",
            name: "Self-expression",
            category: "needs",
            percentile: 0.7946102305866017,
            significant: true
          },
          {
            trait_id: "need_stability",
            name: "Stability",
            category: "needs",
            percentile: 0.2002204644457673,
            significant: true
          },
          {
            trait_id: "need_structure",
            name: "Structure",
            category: "needs",
            percentile: 0.027158926974168274,
            significant: true
          }
        ],
        values: [{
            trait_id: "value_conservation",
            name: "Conservation",
            category: "values",
            percentile: 0.10611273494634299,
            significant: true
          },
          {
            trait_id: "value_openness_to_change",
            name: "Openness to change",
            category: "values",
            percentile: 0.5968531151356367,
            significant: true
          },
          {
            trait_id: "value_hedonism",
            name: "Hedonism",
            category: "values",
            percentile: 0.9065166722682092,
            significant: true
          },
          {
            trait_id: "value_self_enhancement",
            name: "Self-enhancement",
            category: "values",
            percentile: 0.6763748584697902,
            significant: true
          },
          {
            trait_id: "value_self_transcendence",
            name: "Self-transcendence",
            category: "values",
            percentile: 0.9254101553717964,
            significant: true
          }
        ],
        consumption_preferences: [{
            consumption_preference_category_id: "consumption_preferences_shopping",
            name: "Purchasing Preferences",
            consumption_preferences: [{
                consumption_preference_id: "consumption_preferences_automobile_ownership_cost",
                name: "Likely to be sensitive to ownership cost when buying automobiles",
                score: 0.5
              },
              {
                consumption_preference_id: "consumption_preferences_automobile_safety",
                name: "Likely to prefer safety when buying automobiles",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_clothes_quality",
                name: "Likely to prefer quality when buying clothes",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_clothes_style",
                name: "Likely to prefer style when buying clothes",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_clothes_comfort",
                name: "Likely to prefer comfort when buying clothes",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_influence_brand_name",
                name: "Likely to be influenced by brand name when making product purchases",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_influence_utility",
                name: "Likely to be influenced by product utility when making product purchases",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_influence_online_ads",
                name: "Likely to be influenced by online ads when making product purchases",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_influence_social_media",
                name: "Likely to be influenced by social media when making product purchases",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_influence_family_members",
                name: "Likely to be influenced by family when making product purchases",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_spur_of_moment",
                name: "Likely to indulge in spur of the moment purchases",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_credit_card_payment",
                name: "Likely to prefer using credit cards for shopping",
                score: 0
              }
            ]
          },
          {
            consumption_preference_category_id: "consumption_preferences_health_and_activity",
            name: "Health & Activity Preferences",
            consumption_preferences: [{
                consumption_preference_id: "consumption_preferences_eat_out",
                name: "Likely to eat out frequently",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_gym_membership",
                name: "Likely to have a gym membership",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_outdoor",
                name: "Likely to like outdoor activities",
                score: 0
              }
            ]
          },
          {
            consumption_preference_category_id: "consumption_preferences_environmental_concern",
            name: "Environmental Concern Preferences",
            consumption_preferences: [{
              consumption_preference_id: "consumption_preferences_concerned_environment",
              name: "Likely to be concerned about the environment",
              score: 0
            }]
          },
          {
            consumption_preference_category_id: "consumption_preferences_entrepreneurship",
            name: "Entrepreneurship Preferences",
            consumption_preferences: [{
              consumption_preference_id: "consumption_preferences_start_business",
              name: "Likely to consider starting a business in next few years",
              score: 0
            }]
          },
          {
            consumption_preference_category_id: "consumption_preferences_movie",
            name: "Movie Preferences",
            consumption_preferences: [{
                consumption_preference_id: "consumption_preferences_movie_romance",
                name: "Likely to like romance movies",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_movie_adventure",
                name: "Likely to like adventure movies",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_movie_horror",
                name: "Likely to like horror movies",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_movie_musical",
                name: "Likely to like musical movies",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_movie_historical",
                name: "Likely to like historical movies",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_movie_science_fiction",
                name: "Likely to like science-fiction movies",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_movie_war",
                name: "Likely to like war movies",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_movie_drama",
                name: "Likely to like drama movies",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_movie_action",
                name: "Likely to like action movies",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_movie_documentary",
                name: "Likely to like documentary movies",
                score: 0
              }
            ]
          },
          {
            consumption_preference_category_id: "consumption_preferences_music",
            name: "Music Preferences",
            consumption_preferences: [{
                consumption_preference_id: "consumption_preferences_music_rap",
                name: "Likely to like rap music",
                score: 0.5
              },
              {
                consumption_preference_id: "consumption_preferences_music_country",
                name: "Likely to like country music",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_music_r_b",
                name: "Likely to like R&B music",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_music_hip_hop",
                name: "Likely to like hip hop music",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_music_live_event",
                name: "Likely to attend live musical events",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_music_playing",
                name: "Likely to have experience playing music",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_music_latin",
                name: "Likely to like Latin music",
                score: 0.5
              },
              {
                consumption_preference_id: "consumption_preferences_music_rock",
                name: "Likely to like rock music",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_music_classical",
                name: "Likely to like classical music",
                score: 1
              }
            ]
          },
          {
            consumption_preference_category_id: "consumption_preferences_reading",
            name: "Reading Preferences",
            consumption_preferences: [{
                consumption_preference_id: "consumption_preferences_read_frequency",
                name: "Likely to read often",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_books_entertainment_magazines",
                name: "Likely to read entertainment magazines",
                score: 1
              },
              {
                consumption_preference_id: "consumption_preferences_books_non_fiction",
                name: "Likely to read non-fiction books",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_books_financial_investing",
                name: "Likely to read financial investment books",
                score: 0
              },
              {
                consumption_preference_id: "consumption_preferences_books_autobiographies",
                name: "Likely to read autobiographical books",
                score: 0
              }
            ]
          },
          {
            consumption_preference_category_id: "consumption_preferences_volunteering",
            name: "Volunteering Preferences",
            consumption_preferences: [{
              consumption_preference_id: "consumption_preferences_volunteer",
              name: "Likely to volunteer for social causes",
              score: 0
            }]
          }
        ],
        warnings: [{
          warning_id: "WORD_COUNT_MESSAGE",
          message: "There were 103 words in the input. We need a minimum of 600, preferably 1,200 or more, to compute statistically significant estimates"
        }]
      },
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const summary = <ResultsSummary resultData={this.state.resultData} />;
    const bigFive = <ResultsBigFive resultData={this.state.resultData["personality"]} />;
    const resultNeeds = <ResultsNeeds resultData={this.state.resultData["needs"]} />;
    const resultValues = <ResultsValues resultData={this.state.resultData["values"]} />;
    const consumerPrefs = <ResultsConsumerPref resultData={this.state.resultData["consumption_preferences"]} />;

    const { value } = this.state;

    return (
      <div className="site-content--results">
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Tabs value={value} onChange={this.handleChange} scrollable={true} scrollButtons="off">
              <Tab label="Summary" />
              <Tab label="Big Five" />
              <Tab label="Needs" />
              <Tab label="Values" />
              <Tab label="Consumer Preferences" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>{summary}</TabContainer>}
          {value === 1 && <TabContainer>{bigFive}</TabContainer>}
          {value === 2 && <TabContainer>{resultNeeds}</TabContainer>}
          {value === 3 && <TabContainer>{resultValues}</TabContainer>}
          {value === 4 && <TabContainer>{consumerPrefs}</TabContainer>}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Results;
