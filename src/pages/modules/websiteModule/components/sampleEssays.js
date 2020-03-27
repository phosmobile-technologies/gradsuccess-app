import React from "react"
import agenda from "../../../../images/agenda.svg"
import pdf from "../../../../images/pdf.svg"
import EssaySampleVideo from "./EssaySampleVideo"
 /* eslint-disable */
const breakpoints = [375, 576, 768]
const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`)

const SampleEssays = ({
  read,
  essay,
  type,
  discipline,
  downloadPdf,
  fileName,
  Video,
}) => (
  <div
    css={{
      padding: "30px 0px",
    }}
  >
    <div
      css={{
        textAlign: "center",
        color: "gray",
      }}
    >
      <h2> {read} </h2>
    </div>

    {/* main box*/}
    <div
      css={{
        width: "50%",
        margin: "50px auto",
        boxShadow: "2px 2px 5px gray",
        [mq[2]]: {
          margin: "10px auto",
          width: "100%",
          boxShadow: "none",
        },
      }}
    >
      <div
        css={{
          padding: "50px",
          background: "white",
          [mq[2]]: {
            padding: "20px",
          },
        }}
      >
        <div
          css={{
            display: "flex",
            [mq[2]]: {
              padding: "10px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <div>
            <img
              src={agenda}
              alt="book"
              css={{
                [mq[2]]: {
                  maxWidth: "100px",
                },
              }}
            />
          </div>
          <div>
            <div>
              {" "}
              <h3
                css={{
                  [mq[2]]: {
                    textAlign: "center",
                  },
                }}
              >
                {" "}
                {essay}{" "}
              </h3>{" "}
            </div>
            <div
              css={{
                display: "flex",
                [mq[2]]: {
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {" "}
              <img src={pdf} />{" "}
              <a href={downloadPdf} download={fileName}>
                {" "}
                <h5> Download this sample </h5>
              </a>
            </div>
          </div>
        </div>

        {/* second part*/}
        <div
          css={{
            display: "flex",
            fontFamily: '"Poppins", "sans-serif"',
            fontSize: "12px",
          }}
        >
          {" "}
          <span
            css={{
              width: "200px",
              textAlign: "right",
              paddingRight: "30px",
              color: "gray",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
              [mq[2]]: {
                paddingRight: "10px",
                width: "100px",
              },
            }}
          >
            {" "}
            Type:{" "}
          </span>{" "}
          <span
            css={{
              width: "50%",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
            }}
          >
            {" "}
            {type}{" "}
          </span>
        </div>

        {/* second part*/}
        <div
          css={{
            display: "flex",
            fontFamily: '"Poppins", "sans-serif"',
            fontSize: "12px",
          }}
        >
          {" "}
          <span
            css={{
              width: "200px",
              textAlign: "right",
              paddingRight: "30px",
              color: "gray",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
              [mq[2]]: {
                paddingRight: "10px",
                width: "100px",
              },
            }}
          >
            {" "}
            Discipline:{" "}
          </span>{" "}
          <span
            css={{
              width: "50%",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
            }}
          >
            {" "}
            {discipline}{" "}
          </span>
        </div>

        {Video && (
          <div
            css={{
              display: "flex",
              fontFamily: '"Poppins", "sans-serif"',
              fontSize: "12px",
              marginTop: "15px",
              [mq[2]]: {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            {" "}
            <span
              css={{
                width: "200px",
                textAlign: "right",
                paddingRight: "30px",
                color: "gray",
                fontFamily: '"Poppins", "sans-serif"',
                fontSize: "12px",
                [mq[2]]: {
                  paddingRight: "10px",
                  width: "100%",
                  textAlign:"center"
                },
              }}
            >
              {" "}
              Watch Sample Video:{" "}
            </span>{" "}
            <span
              css={{
                width: "80%",
                fontFamily: '"Poppins", "sans-serif"',
                fontSize: "12px",
                [mq[2]]: {
                 width:"100%"
                },
              }}
            >
              <EssaySampleVideo video={Video} />
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default SampleEssays
