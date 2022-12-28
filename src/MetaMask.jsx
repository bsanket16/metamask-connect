import { useState, useEffect } from "react"

import { Suspense } from "react"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

import { AddButton } from "./3dButton"

export const MetaMask = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    getCurrentWalletConnected()
    addWalletListener()
  }, [walletAddress])

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      // MetaMask present
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        // console.log(accounts)
        setWalletAddress(accounts[0])
      } catch (err) {
        // plus icon is created with two boxes
        // when clicked in the center it call this function twice
        // resulting in error - request already pending
        // if we merge those two boxes into one shape, it will be fixed
        console.log(err.message)
      }
    } else {
      // MetaMask absent
      setMessage("Please install MetaMask")
    }
  }

  // Update after page load
  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        })

        if (accounts.length > 0) {
          // console.log(accounts)
          setWalletAddress(accounts[0])
        } else {
          setMessage("Connect to MetaMask using the above button")
        }
      } catch (err) {
        setMessage(err.message)
      }
    } else {
      // MetaMask absent
      setMessage("Please install MetaMask")
    }
  }

  // Listening to account changes on metamask
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        // console.log(accounts)
        setWalletAddress(accounts[0])
      })
    } else {
      setWalletAddress("")
      setMessage("Please install MetaMask")
    }
  }

  return (
    <div className="container">
      <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[-2, 5, 2]} />
        <Suspense fallback={null}>
          <AddButton connectWallet= {connectWallet} />
        </Suspense>
      </Canvas>

      <p className="paragraph">
          {walletAddress && walletAddress.length > 0
            ? `Connected: ${walletAddress.substring(
                0,
                14
              )}...${walletAddress.substring(38)}`
            : message}
        </p>
    </div>
  )
}