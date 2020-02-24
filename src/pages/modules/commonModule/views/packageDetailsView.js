import React, { Component } from "react"
import FieldSetView from "./FieldSetView"
import { Divider } from "@blueprintjs/core"
import CurrencyFormat from "react-currency-format"

export default class PackageDetailsView extends Component {
  render() {
    const data = this.props.data
    if(data){
      return (
        <div>
          <section className="details-container">
            <div className="details-main">
              {data.name && <FieldSetView title="Name" value={data.name} />}
              {data.address && (
                <FieldSetView title="Address" value={data.address} />
              )}
              {data.phone && <FieldSetView title="Phone" value={data.phone} />}
              {data.workplace_1 && (
                <FieldSetView title="Work place 1" value={data.workplace_1} />
              )}
              {data.workplace_1_roles && (
                <FieldSetView
                  title="Role at work place 1"
                  value={data.workplace_1_roles}
                />
              )}
              {data.employment_most_relevant_to_you_masters_application && (
                <FieldSetView
                  title="Employment Relevent to Your Master Application"
                  value={
                    data.employment_most_relevant_to_you_masters_application
                  }
                />
              )}
              {data.typical_achievements && (
                <FieldSetView
                  title="Typical achievements"
                  value={data.typical_achievements}
                />
              )}
              {data.undergraduate_level_courses_master && (
                <FieldSetView
                  title="Undergraduate level courses (master)"
                  value={data.undergraduate_level_courses_master}
                />
              )}
              {data.project_dissertation_name_master && (
                <FieldSetView
                  title="Project dissertation name (master)"
                  value={data.project_dissertation_name_master}
                />
              )}
              {data.most_recent_undergraduate && (
                <FieldSetView
                  title="Most recent undergraduate education"
                  value={data.most_recent_undergraduate}
                />
              )}
              {data.undergraduate_level_grade && (
                <FieldSetView
                  title="Undergraduate level grade"
                  value={data.undergraduate_level_grade}
                />
              )}
              {data.industry_applied_for && (
                <FieldSetView
                  title="Industry applied for"
                  value={data.industry_applied_for}
                />
              )}
              {data.university_and_course_applied_for && (
                <FieldSetView
                  title="University and course applied for"
                  value={data.university_and_course_applied_for}
                />
              )}
              {data.result_ranking && (
                <FieldSetView
                  title="Undergraduate level result ranking"
                  value={data.result_ranking}
                />
              )}
              {data.undergraduate_level_courses_phd && (
                <FieldSetView
                  title="Undergraduate level courses PHD"
                  value={data.undergraduate_level_courses_phd}
                />
              )}
              {data.project_dissertation_name_phd && (
                <FieldSetView
                  title="Project dissertation name PHD"
                  value={data.project_dissertation_name_phd}
                />
              )}
              {data.project_dissertation_name_phd && (
                <FieldSetView
                  title="Project dissertation name PHD"
                  value={data.project_dissertation_name_phd}
                />
              )}
              {data.workplace_1_recognized_job && (
                <FieldSetView
                  title="Workplace 1 recognized job"
                  value={data.workplace_1_recognized_job}
                />
              )}
              {data.workplace_2 && (
                <FieldSetView title="Workplace 2" value={data.workplace_2} />
              )}
              {data.workplace_2_roles && (
                <FieldSetView
                  title="Role at work place 2"
                  value={data.workplace_2_roles}
                />
              )}
              {data.workplace_2_recognized_job && (
                <FieldSetView
                  title="Workplace 2 recognized job"
                  value={data.workplace_2_recognized_job}
                />
              )}
              {data.supervised_before && (
                <FieldSetView
                  title="Superviced Before"
                  value={data.supervised_before}
                />
              )}
              {data.supervised_workplace && (
                <FieldSetView
                  title="Supervision workplace"
                  value={data.supervised_workplace}
                />
              )}
              {data.recent_tertiary_institute && (
                <FieldSetView
                  title="Most recent tertiary institution"
                  value={data.recent_tertiary_institute}
                />
              )}
              {data.number_of_employee_supervised_workplace_1 && (
                <FieldSetView
                  title="Number of employee supervised in workplace 1"
                  value={data.number_of_employee_supervised_workplace_1}
                />
              )}
              {data.number_of_employee_supervised_workplace_2 && (
                <FieldSetView
                  title="Number of employee supervised in workplace 2"
                  value={data.number_of_employee_supervised_workplace_2}
                />
              )}
              {data.recent_tertiary_institute_name && (
                <FieldSetView
                  title="Recent tertiary instutite name"
                  value={data.recent_tertiary_institute_name}
                />
              )}
              {data.scholarship_and_awards && (
                <FieldSetView
                  title="Scholarships and awards"
                  value={data.scholarship_and_awards}
                />
              )}
              {data.final_grade_school_1 && (
                <FieldSetView
                  title="Final grade in school 1"
                  value={data.final_grade_school_1}
                />
              )}
              {data.result_rank_school_1 && (
                <FieldSetView
                  title="Result Rank in school 1"
                  value={data.result_rank_school_1}
                />
              )}
              {data.top_courses_school_1 && (
                <FieldSetView
                  title="Top courses in school 1"
                  value={data.top_courses_school_1}
                />
              )}
              {data.project_dissertation_name_school_1 && (
                <FieldSetView
                  title="Project dissertation name in school 1"
                  value={data.project_dissertation_name_school_1}
                />
              )}
              {data.next_most_recent_tertiary_education && (
                <FieldSetView
                  title="Most recent tertiary education"
                  value={data.next_most_recent_tertiary_education}
                />
              )}
              {data.final_grade_school_2 && (
                <FieldSetView
                  title="Final grade in school 2"
                  value={data.final_grade_school_2}
                />
              )}
              {data.result_rank_school_2 && (
                <FieldSetView
                  title="Result Rank in school 2"
                  value={data.result_rank_school_2}
                />
              )}{" "}
              {data.top_courses_school_2 && (
                <FieldSetView
                  title="Top courses in school 2"
                  value={data.top_courses_school_2}
                />
              )}{" "}
              {data.leadership_experience && (
                <FieldSetView
                  title="Leadership Experience"
                  value={data.leadership_experience}
                />
              )}
              <div className="field-list">
                {data.interpersonal_skills ||
                data.interpersonal_skills ||
                data.presentation_skills ||
                data.programming ||
                data.microsoft_excel ||
                data.java ||
                data.other_skills ? (
                  <h3>Skills</h3>
                ) : (
                  <div></div>
                )}

                {data.interpersonal_skills && <p>Interpersonal Skills</p>}
                {data.presentation_skills && <p>Presentation Skills</p>}
                {data.programming && <p>Programming </p>}
                {data.microsoft_excel && <p>Micrososft Excel</p>}
                {data.java && <p>Java</p>}
                {data.other_skills && <p>{data.other_skills}</p>}
              </div>
              {data.extracurricular_activities && (
                <FieldSetView
                  title="Extracurricular Activites"
                  value={data.extracurricular_activities}
                />
              )}{" "}
              {data.professional_workshops && (
                <FieldSetView
                  title="Professional workshops"
                  value={data.professional_workshops}
                />
              )}{" "}
              {data.academic_conferences_attended && (
                <FieldSetView
                  title="Academic conferences attended"
                  value={data.academic_conferences_attended}
                />
              )}{" "}
              {data.certificate && (
                <FieldSetView title="Certificate" value={data.certificate} />
              )}{" "}
              <div className="field-list">
                {data.english ||
                data.french ||
                data.german ||
                data.spanish ||
                data.nigeria_languages ||
                data.other_languages ? (
                  <h3>Languages</h3>
                ) : (
                  <div></div>
                )}

                {data.english && <p>English Language</p>}
                {data.french && <p>French Language</p>}
                {data.german && <p>German Language </p>}
                {data.spanish && <p>Spanish Language</p>}
                {data.nigeria_languages && <p>Nigeria Languages</p>}
                {data.other_languages && <p>{data.other_languages}</p>}
              </div>
              {data.masters_intended_area_of_research && (
                <FieldSetView
                  title="Masters intended area of research"
                  value={data.masters_intended_area_of_research}
                />
              )}{" "}
              {data.university_of_choice_and_course && (
                <FieldSetView
                  title="University of choice and course"
                  value={data.university_of_choice_and_course}
                />
              )}{" "}
              {data.modules_interested && (
                <FieldSetView
                  title="Modules of interest"
                  value={data.modules_interested}
                />
              )}{" "}
              {data.teaching_personnel_contacted && (
                <FieldSetView
                  title="Teaching personnel contacted"
                  value={data.teaching_personnel_contacted}
                />
              )}{" "}
              {data.certification_dates && (
                <FieldSetView
                  title="Certification Dates"
                  value={data.certification_dates}
                />
              )}{" "}
              {data.organization_contacted_before_hand && (
                <FieldSetView
                  title="Organizations contacted before hand"
                  value={data.organization_contacted_before_hand}
                />
              )}{" "}
              {data.summary_of_interest && (
                <FieldSetView
                  title="Summary of interest"
                  value={data.summary_of_interest}
                />
              )}{" "}
              {data.post_study_goal && (
                <FieldSetView
                  title="Post study goal"
                  value={data.post_study_goal}
                />
              )}{" "}
              {data.referee && (
                <FieldSetView title="Referee" value={data.referee} />
              )}{" "}
            </div>
            <div className="details-side-panel">
              <div className="bp3-callout .modifier">
                <div
                  className="package-icon package-icon-d"
                  style={{ backgroundColor: this.props.statusColor }}
                >
                  {this.props.packageIconCharacter}
                </div>
                <h2 className="bp3-heading line-h">
                  {data.package.package_name}
                </h2>

                <div className="status-container">
                  Status:{" "}
                  <span style={{ color: this.props.statusColor }}>
                    {data.status}
                  </span>
                </div>
                <div className="status-container">
                  Amount:{" "}
                  <CurrencyFormat
                    value={data.package.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                    renderText={value => (
                      <div className="package-price">{value}</div>
                    )}
                  />
                </div>
                <div className="status-container">
                  Turn Arround Time:{" "}
                  <span>{data.package.turn_around_time}</span>
                </div>

                <Divider />
                {data.status === "New" ||
                this.props.assignedAssociate === null ? (
                  <div>Application Not Assigned</div>
                ) : (
                  <div className="status-container">
                    <p>
                      Assign Expert:{" "}
                      {this.props.assignedAssociate.last_name +
                        " " +
                        this.props.assignedAssociate.first_name}
                    </p>
                    {this.props.assignedAssociate.email}
                  </div>
                )}
                <Divider />
              </div>
              {data.attached_file !== "empty" ? (
                <div>
                  <br />
                  <a
                    href={data.attached_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="download-attached-file"
                  >
                    View Attached Document
                  </a>
                  <br />
                </div>
              ) : (
                <div className="download-attached-file">
                  No File Attached to this request
                </div>
              )}
            </div>
          </section>
        </div>
      )
    }else{
      return <div></div>
    }
    
  }
}
